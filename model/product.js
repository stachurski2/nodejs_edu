
const path = require('path');
const uuid = require('uuid').v4;
const fs = require('fs');
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
        this.uuid =  uuid()
        this.title = title;
        this.descripton = descripton;
        this.imageLink = imageLink;
        this.price = price;
    };

    save() {
        getProductsFile(( products => {
            products.push(this);
            fs.writeFile(ownPath, JSON.stringify(products), (err) => {});
        }))
    };

    static getProducts(callback) {
         getProductsFile(callback);
    }

    static deleteProduct(productUUID,callback ) {
        deleteProduct(productUUID, callback);
    }
}

