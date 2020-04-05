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
    product.getProducts((products => {
    res.render("productList" ,{ pageTitle: "productList",
                                prods: products,
                                path: "/admin/products" });
    }))
};

exports.postAddProduct = (req, res, next) => {
    let newProduct = new product(req.body.title, 
                                 req.body.description, 
                                 req.body.imageLink,
                                 req.body.price);
    newProduct.save();
    res.redirect('/');
};

exports.postDeleteProduct = (req, res, nest) => {
    product.deleteProduct(req.body.uuid, ( value => {
        res.redirect('/');
    }))
};

exports.products = product.getProducts;
