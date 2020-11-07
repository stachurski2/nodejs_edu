const Sequelize = require('sequelize');

const database = require('../utils/database');

const Cart = database.sequelize.define('cart', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    }
});

module.exports = Cart;