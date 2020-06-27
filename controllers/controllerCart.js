const cart = require('../model/cart');
const product = require('../model/product');
exports.getCart = (req,res,next) => {   
    console.log("getCart");
    cart.getCart( cart => {
        res.render('Cart', { pageTitle: 'Cart', path: '/cart', cart: cart });
    })
 };


 exports.addProductToCart = (req,res,next) => {   
    cart.getCart( cart => {
        let identifier = req.body.productId;
        product.getProduct(identifier, product => {
        cart.addProduct(product, (newCart) => {
                res.render('Cart', { pageTitle: 'Cart', path: '/cart', cart: newCart });
            });
        })
    })
 };

 exports.removeProductFromCart = (req, res, next) => {
     cart.getCart( cart => {
         let identifier = req.body.productId;
         let index = req.body.index;
         product.getProduct(identifier, product => {
            cart.removeProduct(product, index, (newCart) => { 
                res.render('Cart', { pageTitle: 'Cart', path: '/cart', cart: newCart });
            });
         });
     });
 }