// const Sequelize = require('sequelize');

// const database = require('../utils/database');

class CartItem {
    constructor(productId) {
        this.productId = productId;
        this.quantity = 1;
    }

}

module.exports = CartItem;
