//cSpell:Ignore codigobarra, descricao, preco, upsert
const Produto = require('../model/Produto')
const express = require('express')
const { check, validationResult } = require("express-validator")
const router = express.Router()
const auth = require('../middleware/auth')

/* #####################################
// Lista todos os produtos
######################################## */
router.get("/", auth, async(req, res) => {
    try{
        const produtos = await Produto.find().sort({nome:1})
        res.json(produtos)
    } catch (e){
        res.send({error: 'Erro ao obter os Produtos'})
    }
})

/* #####################################
// Lista um produto pelo ID
######################################## */
router.get("/:id", auth, async(req, res) => {
    Produto.findById(req.params.id)
    .then(produto => {        
        res.send(produto);
    }).catch(err => {       
        return res.status(500).send({
            message: `Erro ao obter o Produto com o id ${req.params.id}. Erro:${err.messsage}`
        });
    });
})

/* #####################################
// Inclui um novo produto
######################################## */
router.post("/", auth,
[
    check("nome","Informe o nome do produto").not().isEmpty(),
    check("codigobarra","Código de Barra deve ter 13 caracteres")
        .isNumeric()
        .isLength({min:13, max:13}),
    check("preco","Informe um preço válido")
    .isFloat({min:0})

],
    async(req, res) => {
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({
                errors: errors.array()
            })
        }
        const {nome, descricao, preco, codigobarra} = req.body
        try {
            
            let produto = new Produto({nome, descricao, preco, codigobarra})
            await produto.save()
            res.send(produto)
        } catch (err){
            return res.status(500).json({
                errors: `Erro ao salvar o produto: ${err.message}`
            })
        }

})

/* #####################################
// Apaga o produto pelo ID
######################################## */
router.delete("/:id", auth, async(req, res) => {
    await Produto.findByIdAndRemove(req.params.id)
    .then(produto => {      
        res.send({message: `Produto removido com sucesso!`});
    }).catch(err => {       
        return res.status(500).send({
            message: "Não foi possível apagar o produto com o Id " + req.params.id + " - " +err.message
        });
    });
})

/* #####################################
// Edita o produto
######################################## */

router.put("/", auth,
[
    check("nome","Informe o nome do produto").not().isEmpty(),
    check("codigobarra","Código de Barra deve ter 13 caracteres")
        .isNumeric()
        .isLength({min:13, max:13}),
    check("preco","Informe um preço válido")
    .isFloat({min:0})

],
    async(req, res) => {
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({
                errors: errors.array()
            })
        }
        let dados = req.body
        
        await Produto.findByIdAndUpdate(req.body._id, {
            $set: dados
        }, {new: true},           
            function(err, result) {
              if (err) {
                res.send(err);
              } else {
                res.send(result);
              }
            }
          );
})


module.exports = router