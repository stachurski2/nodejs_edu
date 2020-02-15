const express = require('express');
const Router = express.Router();
const path = require('path');
const rootDir = require('../utils/path')
Router.get( '/add-product', (req,res,next) => {
    res.sendFile(path.join(rootDir, 'views', 'addProduct.html'));
})

Router.post('/add-product', (req, res, next) => {
    res.redirect('/');
});

module.exports = Router