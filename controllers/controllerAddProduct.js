const fs = require('fs')
const Product = require('../model/product');
 
class ControllerAddProduct {

    static getAddProduct = (req, res, next) => {
        res.render('addProduct', {
                                pageTitle: 'Add Product', 
                                path: '/admin/add-product',
                                addProductActive: true
                                });
    };

    static getProducts = (req, res, next) => {
        req.user.getProducts().then(products => {
        res.render("productList", { pageTitle: "productList",
                                        prods: products,
                                        path: "/admin/products" }); 
        });
    };

    static postAddProduct = (req, res, next) => {
        let product = new Product(req.body.title, req.body.price, req.body.description, req.body.imageLink, req.user._id);
        product.save().then(result => {
            ControllerAddProduct.getProducts(req, res, next);
        }).catch( error => {
            res.render('unknownError',{ pageTitle: 'Database error', path: '/unknownError' } );
        });
    };


    static postEditProduct = (req, res, next) => {
        const prodId = req.body['id'];
        let modifiedProduct = new Product(req.body.title, req.body.price, req.body.description, req.body.imageLink, req.user._id, prodId)
        modifiedProduct.save().then( result => {
            ControllerAddProduct.getProducts(req, res, next);
        }).catch( error => {
            res.render('unknownError',{ pageTitle: 'Database error', path: '/unknownError' } );
        });
    };

    static editProduct = (req, res, next) => {
        const prodId = req.query['id'];
        Product.getProduct(prodId).then(product => {
            if(product) {
                console.log(product)
                res.render('editProduct', {
                    pageTitle: 'Edit Product', 
                    path: '/admin/editProduct',
                    product: product
                });
            } else {
                res.render('unknownError',{ pageTitle: 'Database error', path: '/unknownError' } );
            }
        });
    };


    static postDeleteProduct = (req, res, next) => {
        const prodId = req.body.id;
        Product.deleteProduct(prodId).then(result => {
            ControllerAddProduct.getProducts(req, res, next);
        });
    };

}

module.exports = ControllerAddProduct;