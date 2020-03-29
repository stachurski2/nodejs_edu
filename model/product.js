const path = require('path');
const fs = require('fs');
const ownPath = path.join(path.dirname(process.mainModule.filename),'data','products.json');

module.exports = class Product {
    constructor(title) {
        this.title = title;
    };

    save() {
        fs.readFile(ownPath,(err, fileContent) => {
            let products = [];
            if(!err) {
                products = JSON.parse(fileContent)
            }
            products.push(this);
            fs.writeFile(ownPath, JSON.stringify(products), (err) => {});
        });
    };

    static getProducts(callback) {
        fs.readFile(ownPath,(err, fileContent) => {
            if(err) {
                callback([]);
                return; 
            } 
            callback(JSON.parse(fileContent));
        });
    }
}

