const product = require('../model/product');

exports.getAddProduct = (req, res, next) => {
    res.render('addProduct', {
                              pageTitle: 'Add Product', 
                              path: '/admin/add-product',
                              addProductActive: true
                            });
};

exports.postAddProduct = (req, res, next) => {
    product.addProduct(req.body.title);
    res.redirect('/');
};

exports.products = product.getProducts;
