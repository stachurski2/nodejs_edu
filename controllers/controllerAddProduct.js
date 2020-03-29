const fs = require('fs')
const product = require('../model/product');

exports.getAddProduct = (req, res, next) => {
    res.render('addProduct', {
                              pageTitle: 'Add Product', 
                              path: '/admin/add-product',
                              addProductActive: true
                            });
};

exports.getProducts = (req, res, next) => {
    res.render('404',{ pageTitle: "xxx", path: "/admin/products" });
};

exports.postAddProduct = (req, res, next) => {
    let newProduct = new product(req.body.title);
    newProduct.save();
    res.redirect('/');
};

exports.products = product.getProducts;
