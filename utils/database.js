const Sequelize = require('sequelize');


const sequelize = new Sequelize('dba8an906tqv84','iizceyljgdhacn','708f9f1c55ba9ebeb786330d8b8e038591164aefd8c434da7037baa61f842092', {
    host: 'ec2-54-247-122-209.eu-west-1.compute.amazonaws.com',
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false // <<<<<<< YOU NEED THIS
          }
    } //,
   // port: 5432
});

class Database {

    static startRun(successCallback, failureCallBack) {
        let Product = require('../model/product');
        let Cart = require('../model/cart');
        let cardItem = require('../model/cartItem');
        let Order = require('../model/order');
        let OrderItem = require('../model/orderItem');
        let User = require('../model/user');
        Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE'});
        User.hasMany(Product);
        User.hasOne(Cart);
        Cart.belongsTo(User);
        Cart.belongsToMany(Product, { through: cardItem })
        Product.belongsToMany(Cart, { through: cardItem })
        Order.belongsTo(User);
        User.hasMany(Order);
        Order.belongsToMany(Product, { through: OrderItem })


        sequelize.sync()
        .then(result => {
            return User.findById(1).then( user => {
                if(!user) {
                    return User.create({ name: 'Stachu', email: 'stachurski2@gmail.com'})
                }
                return user
            })
        }).then (user => {
            successCallback();
        }).catch( err => {
            console.log(err);
            failureCallBack(err);
        });     
    }
}

exports.database = Database;
exports.sequelize = sequelize;