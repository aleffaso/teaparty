const Sequelize = require('sequelize');
const dotenv = require('dotenv');

dotenv.config({path: './.env'})

const connection = new Sequelize(
    process.env.POSTGRES_NAME, 
    process.env.POSTGRES_USER, 
    process.env.POSTGRES_PASSWORD,
    {
        host: process.env.POSTGRES_HOST,
        dialect: process.env.POSTGRES_DIALECT,
        timezone: process.env.POSTGRES_TIMEZONE
    });
module.exports = connection;