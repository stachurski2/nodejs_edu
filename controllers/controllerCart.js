const cartItem = require('../model/cartItem');
// const product = require('../model/product');
const Product = require('../model/product');
// const order = require('../model/order')
const databaseErrorController = require('./controllerDatabaseError');
const CartItem = require('../model/cartItem');

exports.getCart = (req,res,next) => {   
    let cartItems = req.user.getCart().map(cartItem => { 
        return Product.getProduct(cartItem.productId).then( product => {
            product.cartItem = cartItem;
            return product;
        })
    })

    Promise.all(cartItems).then(values => {
        res.render('cart', { pageTitle: 'Cart', path: '/cart', cartProducts: values });
    })
 };


//  exports.createOrder = (req, res, next) => {
//     let fetchedCart;
//     req.user.getCart().then(cart => { 
//         if(cart) {
//             fetchedCart = cart;
//             return cart.getProducts().then( products => {
//                 return req.user.createOrder().then( order => {
//                     return order.addProducts(
//                         products.map(product => {
//                             product.orderItem = { quantity: product.cartItem.quantity };
//                             return product;
//                         })
//                     )
//                 })
//             }).then(result => {
//                 return fetchedCart.setProducts(null);
//               }).then(result => {
//                 res.redirect('/orders');
//               })
//         } else {
//             databaseErrorController.getDatabaseError(req, res, next);
//         }
//     }).catch( err => {
//         databaseErrorController.getDatabaseError(req, res, next);
//     })
//  }

 exports.addProductToCart = (req,res,next) => {   
    if(req.body.productId) {
        req.user.addToCart(req.body.productId).then(result => {
            this.getCart(req, res, next);
        }).catch( err => {
            databaseErrorController.getDatabaseError(req, res, next);
        });
    } else {
        databaseErrorController.getDatabaseError(req, res, next);
    }
 };

 exports.removeProductFromCart = (req, res, next) => {
    if(req.body.productId) {
        req.user.removeOneFromCart(req.body.productId).then(result => {
            this.getCart(req, res, next);
        }).catch( err => {
            databaseErrorController.getDatabaseError(req, res, next);
        });
    } else {
        databaseErrorController.getDatabaseError(req, res, next);
    }   
 };

    exports.getOrders = (req, res, next) => {
        req.user
          .getOrders({include: ['products']})
          .then(orders => {
            res.render('orders', {
              path: '/orders',
              pageTitle: 'Your Orders',
              orders: orders
            });
          }).catch(err => console.log(err));
    };
