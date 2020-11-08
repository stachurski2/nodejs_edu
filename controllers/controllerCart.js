const cart = require('../model/cart');
const product = require('../model/product');
const order = require('../model/order')
const databaseErrorController = require('./controllerDatabaseError');

exports.getCart = (req,res,next) => {   
    console.log("getCart");

    req.user.getCart().then( cart => { 
        if(!cart) {
            let cart = req.user.createCart();
            let cartProducts = cart.getProducts()

            res.render('cart', { pageTitle: 'Cart', path: '/cart', cartProducts: cartProducts });
        } else {
             cart.getProducts().then( cartProducts => {
                res.render('cart', { pageTitle: 'Cart', path: '/cart', cartProducts: cartProducts });
            });
        }
    }).catch( err => {
        databaseErrorController.getDatabaseError(req, res, next);
    })
 
 };


 exports.createOrder = (req, res, next) => {
    let fetchedCart;
    req.user.getCart().then(cart => { 
        if(cart) {
            fetchedCart = cart;
            return cart.getProducts().then( products => {
                return req.user.createOrder().then( order => {
                    return order.addProducts(
                        products.map(product => {
                            product.orderItem = { quantity: product.cartItem.quantity };
                            return product;
                        })
                    )
                })
            }).then(result => {
                return fetchedCart.setProducts(null);
              }).then(result => {
                res.redirect('/orders');
              })
        } else {
            databaseErrorController.getDatabaseError(req, res, next);
        }
    }).catch( err => {
        databaseErrorController.getDatabaseError(req, res, next);
    })
 }

 exports.addProductToCart = (req,res,next) => {   
    req.user.getCart()
    .then( cart => {    
        if(!cart) {
             databaseErrorController.getDatabaseError(req, res, next);
        }
        var quantity = 1;
        var identifier = req.body.productId;
        cart.getProducts({where: { id : identifier }, through: {quantity: quantity}}).then( products => {
            if(products[0]) {
                quantity = products[0].cartItem.quantity + 1
            }
            return quantity
        }).then( quantity => {
            req.user.getProducts({where: {id : identifier}}).then(products => {
                if(!products) {
                    databaseErrorController.getDatabaseError(req, res, next);
                } else {
                    cart.addProduct(products[0], {through: {quantity: quantity}}).then( () => {
                        this.getCart(req,res,next);
                })
                }
            })
        })
    })
    .catch( err => {
        databaseErrorController.getDatabaseError(req, res, next);
    })
 };

 exports.removeProductFromCart = (req, res, next) => {
    let identifier = req.body.productId;
    let quantity = req.body.quantity;
    req.user.getCart()
    .then( cart => {    
        if(!cart) { 
             databaseErrorController.getDatabaseError(req, res, next);
        } else {
           cart.getProducts({where: { id: identifier}}).then( products => {
               if(products[0]) {
                    if(quantity == products[0].cartItem.quantity)  {
                        products[0].cartItem.destroy().then( () => {
                            this.getCart(req,res,next);
                        })
                    } else {
                        cart.addProduct(products[0], {through: {quantity: products[0].cartItem.quantity - quantity}}).then( () => {
                            this.getCart(req,res,next);
                        });
                    }
               } else {
                    databaseErrorController.getDatabaseError(req, res, next);
               }
           })
        }
    }).catch( err => {
        databaseErrorController.getDatabaseError(req, res, next);
    })
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
