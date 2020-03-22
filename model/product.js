const products = [];
module.exports = class Product {
    constructor(title) {
        this.title = title;
    };

    static addProduct(title) {
        products.push(new Product(title))
    };

    static getProducts() {
        return products;
    }
}

