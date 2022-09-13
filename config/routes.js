const express = require("express");
const routes = express.Router();

const connection = require("../db/db");
const Product = require("../db/Product");

//main page
routes.get("/", (req, res) => {
    Product.findAll({
        order:[['id', 'DESC']]
    }).then(products => {
        res.render("index", {
            token: req.session.token, 
            products: products,
            message: null,
            title: null,
        });
    });
})

routes.post("/update", (req,res) => {

    var { id, title, picture, person, link } = req.body

    Product.update(
        {
            title: title,
            picture: picture,
            person: person,
            link: link
        },
        {
        where: {
            id:id
        }
    }).then(products => { 
        Product.findAll({
            order:[['id', 'DESC']]
        }).then((products) => {
            res.render("index", {
                token: req.session.token, 
                products: products,
                message: true,
                title: "Obrigadinho! Você poderá verificar no item que há um link com sugestão de onde comprar"
            });
        }).catch(err => {
        res.render("index", {
            token: req.session.token, 
            products: products,
            message: false,
            title: "Algo deu errado: " + err
            });
         });
    });
});

//Database connection
connection.authenticate().then(() => {
    console.log("connection success");
}).catch((error) => {
    console.log(error);
});

module.exports = routes;