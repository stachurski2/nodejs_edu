const path = require('path');
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

module.exports = class Product {
    constructor(title) {
        this.title = title;
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
}

