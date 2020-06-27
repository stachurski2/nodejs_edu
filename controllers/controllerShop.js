const product = require('../model/product');

exports.getIndex = (req,res,next) => {   
     product.getProducts((products =>  {
        res.render("shop",{ hasProducts: (products.length > 0),
            prods: products, 
            pageTitle: 'Shop',
            path:'/'});
        }
     ));   
};

exports.getProducts =  (req,res,next) => {   
   console.log("getProducts");
   res.status(404).render('404', { pageTitle: 'Page Not Found', path: '/products' });
};
 
 exports.getOrders = (req,res,next) => {   
    console.log("getOrders");
    res.status(404).render('404', { pageTitle: 'Page Not Found', path: '/orders' });

 };
 
 exports.getCheckout = (req,res,next) => {   
    console.log("checkout");
    res.status(404).render('404', { pageTitle: 'Page Not Found', path: '/checkout' });
 };

 exports.getProduct = (req, res, next) => {
 const prodId = req.params.productId;
  var didFind = false; 
    product.getProduct(prodId, (product) => {
      res.render('product', { pageTitle: 'Product', path: '/product/id', product: product });
    });
 };
 