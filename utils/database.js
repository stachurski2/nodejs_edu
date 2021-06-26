// const Sequelize = require('sequelize');
const mongoDb = require('mongodb');
const { getDatabaseError } = require('../controllers/controllerDatabaseError');
const mongoClient =  mongoDb.MongoClient;

let _db;

class Database {
    
    static runDatabase(successCallback, failureCallBack) {
        mongoClient
        .connect('mongodb+srv://admin:eaMD6l2jol9hvWEH@testcluster.iqt8o.mongodb.net/?retryWrites=true&w=majority', {  useNewUrlParser: true, useUnifiedTopology: true })
        .then( client => {
            _db = client.db('test');
            successCallback();
        })
        .catch( err => {
            console.log(err);
            failureCallBack();
        });
    }
    static getDatabase() {
        if(_db) {
            return _db;
        } else {
            throw 'No database error';
        }
    }

    static getObjectId(id) {
        return new mongoDb.ObjectId(id);
    }

//         let Product = require('../model/product');
//         let Cart = require('../model/cart');
//         let cardItem = require('../model/CartItem');
//         let Order = require('../model/order');
//         let OrderItem = require('../model/orderItem');
//         let User = require('../model/User');
//         Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE'});
//         User.hasMany(Product);
//         User.hasOne(Cart);
//         Cart.belongsTo(User);
//         Cart.belongsToMany(Product, { through: cardItem })
//         Product.belongsToMany(Cart, { through: cardItem })
//         Order.belongsTo(User);
//         User.hasMany(Order);
//         Order.belongsToMany(Product, { through: OrderItem })


//         sequelize.sync()
//         .then(result => {
//             return User.findById(1).then( user => {
//                 if(!user) {
//                     return User.create({ name: 'Stachu', email: 'stachurski2@gmail.com'})
//                 }
//                 return user
//             })
//         }).then (user => {
//             successCallback();
//         }).catch( err => {
//             console.log(err);
//             failureCallBack(err);
//         });     

    
}

exports.database = Database;
// exports.sequelize = sequelize;