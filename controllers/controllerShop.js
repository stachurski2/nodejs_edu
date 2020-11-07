const product = require('../model/product');

exports.getIndex = (req,res,next) => {   
    req.user.getProducts()
     .then( products => {
      res.render("shop",{ hasProducts: (products.length > 0),
         prods: products, 
         pageTitle: 'Shop',
         path:'/'});
     })
     .catch(  err => {
      res.render("shop",{ hasProducts: false,
         prods: [], 
         pageTitle: 'Shop',
         path:'/'});
     })
};

exports.getProducts = (req,res,next) => {   
   req.user.getProducts().then( products => {
        res.render("productList", { pageTitle: "productList",
                                    prods: products,
                                    path: "/admin/products" });
    }) 
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

   req.user.getProducts({where: {
         id: prodId
   }
   }).then( products => {
         res.render('product', { pageTitle: 'Product', path: '/product/id', product: products[0] });
    }).catch( err => {
      res.render('unknownError',{ pageTitle: 'Database error', path: '/unknownError' } );
    })


    
 };
 