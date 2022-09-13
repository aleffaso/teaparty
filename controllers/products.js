const express = require('express');
const routes = express.Router();
const dotenv = require('dotenv');

const Product = require('../db/Product');
const adminAuth = require("../middlewares/authorization"); 

dotenv.config({path: './.env'})

routes.get("/admin/products", adminAuth, (req, res) => {
    renderProduct(res, req.session.token, null, null)
});

routes.get("/admin/product/new", adminAuth, (req, res) => {
    res.render("admin/products/new", {token:req.session.token});
});

routes.post("/product/new", adminAuth, (req,res) => {

    var { title, picture, link } = req.body

    Product.create({
        title: title,
        picture: picture,
        person: null,
        link: link
    }).then(() =>{
        renderProduct(res, req.session.token, true, "Produto criado com sucesso")
    })
});

routes.post("/products/delete", adminAuth, (req, res) => {
    var id = req.body.id;
    if(id != undefined){
        if(!isNaN(id)){ //is it a number or not?
            Product.destroy({
                where: {id: id}
            }).then(() => {
                renderProduct(res, req.session.token, true, "Produto deletado com sucesso")
            });
        }else{
            renderProduct(res, req.session.token, false, "Produto não encontrado")
        }
    }else{
        renderProduct(res, req.session.token, false, "Produto não encontrado")
    }
});

routes.get("/admin/products/edit/:id", adminAuth, (req,res) => {
    var id = req.params.id;

    if(isNaN(id)){
        renderProduct(res, req.session.token, false, "Produto não encontrado")
    };

    Product.findByPk(id).then(product => {
        if(product != undefined){
            res.render("admin/products/edit", {token:req.session.token, product: product});        
        }else{
            renderProduct(res, req.session.token, true, "Produto não encontrado")
        }
    }).catch(err => {
        renderProduct(res, req.session.token, false, err)
    });
});

routes.post("/product/update", adminAuth, (req,res) => {

    var { id, title, picture, link, active } = req.body
    
    if (active == undefined){
        active = false
    }

    Product.update(
        {
            title: title,
            picture: picture,
            person: null,
            link: link
        },
        {
        where: {
            id:id
        }
    }).then(() => {
        renderProduct(res, req.session.token, true, "Produto atualizado com sucesso")
    }).catch(err => {
        renderProduct(res, req.session.token, false, err)
    })
});

async function renderProduct(res, token, message, title){
    Product.findAll().then(products => {
        res.render("admin/products/index", {
            token: token, 
            products: products,
            message: message,
            title: title
        });
    })
}

module.exports = routes;