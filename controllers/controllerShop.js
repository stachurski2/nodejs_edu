const product = require('../model/product');

exports.getProducts =  (req,res,next) => {   
     product.getProducts((products =>  {
        res.render("shop",{ hasProducts: (products.length > 0),
            prods: products, 
            pageTitle: 'Shop',
            path:'/'});
        }
     ));
   
    };