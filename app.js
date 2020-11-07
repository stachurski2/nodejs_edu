const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const adminData = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const cartRoutes = require('./routes/cart');
const database = require('./utils/database');
const rootDir = require('./utils/path');
const error404 = require('./controllers/controller404');
const User = require('./model/user');


app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, "public")));

app.set('view engine', 'ejs');
app.set('views','views');


app.use((req, res, next) => {
    User.findById(1)
    .then( user => {  
        req.user = user;
        next();
    })
    .catch(err => console.log(err));
});

database.database.startRun( () => {
    app.listen(process.env.PORT || 3000);
}, (error) => {
    console.log(err);
})

app.use('/admin',adminData.routes);
app.use(shopRoutes);
app.use(cartRoutes);
app.use(error404.get404error);


