const product = require('../model/product');

exports.getProducts =  (req,res,next) => {   
    const products = product.getProducts();
    res.render("shop",{ hasProducts: (products.length > 0),
                        prods: products, 
                        pageTitle: 'Shop',
                        path:'/'});
    };