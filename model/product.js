
const path = require('path');
const uuid = require('uuid').v4;
const fs = require('fs');
const Product = require('./product')
const ownPath = path.join(path.dirname(process.mainModule.filename),'data','products.json');

function getProductsFile(callback) {
    fs.readFile(ownPath,(err, fileContent) => {
        let products = [];
        if(!err) {
            products = JSON.parse(fileContent)
        }
        callback(products);
    });
}

function getProduct(identifer, successCallback) {
    fs.readFile(ownPath,(err, fileContent) => {
        let products = [];
        if(!err) {
            products = JSON.parse(fileContent)
            let filteredProducts = products.filter( product =>
                product.uuid == identifer
            )
            successCallback(filteredProducts[0])
        }
    });
}

function deleteProduct(productUUID, callback) {
    getProductsFile((products => {
        var newProducts = products.filter(function(product) {
            return product.uuid != productUUID;
        })
        fs.writeFile(ownPath, JSON.stringify(newProducts), (err) => {});
        callback();
    }))
}

module.exports = class Product {
    constructor(title, descripton, imageLink, price) {
        this.uuid = uuid()
        this.title = title;
        this.descripton = descripton;
        this.imageLink = imageLink
        this.price = price;
    };

    static construct(genericObj) {
        let product = new Product(genericObj.title, genericObj.descripton, genericObj.imageLink, genericObj.price);
        product.uuid = genericObj.uuid;
        return cart;
    };

    save() {
        getProductsFile( products => {
            products.push(this);
            fs.writeFile(ownPath, JSON.stringify(products), (err) => {});
        })
    };

    static getProducts(callback) {
         getProductsFile(callback);
    }


    static getProduct(identifier ,successCallback) {
        getProduct(identifier, successCallback);
    }


    static deleteProduct(productUUID, callback) {
        deleteProduct(productUUID, callback);
    }
}

