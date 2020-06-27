const fs = require('fs');
const path = require('path');
const Product = require('uuid').v4;
const uuid = require('uuid').v4;

const ownPath = path.join(path.dirname(process.mainModule.filename),'data','cart.json');

function addProduct(product, cart) {
    cart.products.push(product)
}

function removeProduct(product, cart, index, callback) {
    let array = new Array();
    for (var i = 0; i < cart.products.length; i++) {
       console.log(i);       
       if((i == index && cart.products[i].uuid == product.uuid) == false ) {
             let newProduct = new Product()
             newProduct.uuid = product.uuid
             newProduct.title = product.title
             newProduct.price = product.price
             newProduct.description = product.description
             newProduct.imageLink = product.imageLink
            array.push(newProduct);
       };
     };
     cart.products = array;
     save(cart)
    callback(cart);
}

function save(cart) {
    fs.writeFile(ownPath, JSON.stringify([cart]), (err) => {});
}

 class Cart {

    constructor() {
        this.uuid = uuid()
        this.products = new Array();
    };

    static construct(genericObj) {
        let cart = new Cart();
        cart.uuid = genericObj.uuid;
        cart.products = genericObj.products;
        return cart;
    };

    addProduct(product, callback) {
        getCartFile(cart => {
            addProduct(product, cart);
            save(cart);
            callback(cart);
        })
    }

    removeProduct(product, index, callback) {
        removeProduct(product,this, index, callback);
    }

    static getCart(callback) {
        getCartFile(cart => {
            callback(Cart.construct(cart));
        })
    }
}

function getCartFile(callback) {
    fs.readFile(ownPath,(err, fileContent) => {
        let carts = [];
        if(!err) {
            carts = JSON.parse(fileContent)
        }
        if(carts.length > 0) {
            callback(carts[0]);
        } else {
            let cart = new Cart();
            callback(cart);
        }
    });
}

module.exports = Cart;


