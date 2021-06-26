const database = require('../utils/database');
const CartItem = require('./cartItem');

class User {
    constructor(email, name, cart ,id) {
        this.email = email;
        this.name = name;
        this.cart = cart;
        this._id = id;
    }
    
    save() {
        if(this._id) {
            console.log(this);
            return database.database.getDatabase().collection('users').updateOne({ _id: database.database.getObjectId(this._id)}, { $set: { email: this.email,
                                                                                                                                            cart: this.cart,
                                                                                                                                            name: this.name}}).then( result => {
                                                                                                                                                console.log(result);
                                                                                                                                            })
        } else {
            return database.database.getDatabase().collection('users').insertOne(this).then( result => {
                console.log(result);
            })
        }
    }

    getProducts() {
        return database.database.getDatabase().collection('products').find({ userId:this._id}).toArray().then( products => {
            console.log(products);
            return products;
          })
          .catch(err => {
            console.log(err);
          });
    }


    getCart() {
        return this.cart;
    }

    addToCart(productId) {
        let cartItem = this.cart.find( item => { 
            if(item) {
                return item.productId === productId 
            }
        })
        if(cartItem) {
            cartItem.quantity = cartItem.quantity + 1;
        } else {
            cartItem = new CartItem(productId);
            this.cart.push(cartItem);
        }
        return this.save();
    }

    removeOneFromCart(productId) {
        let cartItem = this.cart.find( item => { 
            if(item) {
                return item.productId === productId 
            }
        })
        if(cartItem) {
            if(cartItem.quantity > 1) {
                cartItem.quantity = cartItem.quantity - 1;

            } else {
                const index = this.cart.indexOf(cartItem);
                if (index > -1) {
                    this.cart.splice(index, 1);
                }
            }
        } 
        console.log(this.cart);
        return this.save();
    }

    removeAllFromCart(product) {
        this.save();

    }

    static findUser(userId) {
        return database.database.getDatabase().collection('users').findOne({_id: database.database.getObjectId(userId) })
        .then(user => {
            return new User(user.email, user.name, user.cart, user._id.toHexString());
          })
          .catch(err => {
            console.log(err);
          });
    }
}

module.exports = User;
