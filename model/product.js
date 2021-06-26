const database = require('../utils/database');


class Product {
    constructor(title, price, description, imageURL, userId, id) {
        this.title = title;
        this.price = price;
        this.description = description;
        this.imageURL = imageURL;
        this.userId = userId;
        this._id = id ? database.database.getObjectId(id): null;
    }
    
    save() {

        if(this._id) {
            return database.database.getDatabase().collection('products').updateOne({ _id: this._id}, { $set: this }).then(result => {
                console.log(result);
            })
        } else {
            return database.database.getDatabase().collection('products').insertOne(this).then(result => {
                console.log(result);
            })
        }
    }

    static getProducts(successCallback) {
        return database.database.getDatabase().collection('products').find({}).toArray(function(err, result) {
            if (err) {
                throw err;
            } else {
                successCallback(result);
            }
          });
    };

    static getProduct(id) {
        return database.database.getDatabase().collection('products').find( 
            { _id: database.database.getObjectId(id)}
        ).next()
       
    }

    static deleteProduct(id) {
        return database.database.getDatabase().collection('products').deleteOne({ _id: database.database.getObjectId(id)});
    }
}
module.exports = Product;
