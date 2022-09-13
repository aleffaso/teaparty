const express = require("express");
const routes = express.Router();

const connection = require("../db/db");
// const Product =require("../db/Product")
// const User =require("../db/User")

//main page
routes.get("/", (req, res) => {
    res.render("index")
});

//Database connection
connection.authenticate().then(() => {
    console.log("connection success");
}).catch((error) => {
    console.log(error);
});

module.exports = routes;