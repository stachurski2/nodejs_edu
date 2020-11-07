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
    req.user.getProducts()
    .then( products => {
    res.render("productList", { pageTitle: "productList",
                                    prods: products,
                                    path: "/admin/products" });
    }).catch( error => {
        res.render("unknownError");
    })
};

exports.postAddProduct = (req, res, next) => {
     req.user.createProduct({ 
        title: req.body.title,
        price: req.body.price,
        imageURL: req.body.imageLink,
        description: req.body.description
     }).then( function (product) {
        if (product) {
           res.redirect('/admin/products');
        } else {
            res.render('unknownError',{ pageTitle: 'Database error', path: '/unknownError' } );
        }
    }).catch( err => {
        res.render('unknownError',{ pageTitle: 'Database error', path: '/unknownError' } );

    })
};

exports.postDeleteProduct = (req, res, nest) => {
    const prodId = req.body.uuid;
  var didFind = false; 

   product.destroy( {
       where: {
        id: prodId
       }
   }).then( () => {
     res.redirect('/');
   }).catch( err => {
        res.render('unknownError',{ pageTitle: 'Database error', path: '/unknownError' } );
    })
};

