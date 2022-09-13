const Sequelize = require("sequelize");
const connection = require("./db");

const Product = connection.define('products', {
    title: 
    {
        type: Sequelize.STRING,
        allowNull: false
    },
    picture:
    {
        type: Sequelize.STRING,
        allowNull: false
    },
    link: 
    {
        type: Sequelize.STRING,
        allowNull: false
    },
    person:
    {
        type: Sequelize.STRING,
        allowNull: true
    },
    active:
    {
        type: Sequelize.BOOLEAN,
        allowNull: false
    }
});

Product.sync({force:false}).then(() => {}); //Create table in case of it does not exist

module.exports = Product;