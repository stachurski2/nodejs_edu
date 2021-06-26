const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const adminData = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const cartRoutes = require('./routes/cart');
const database = require('./utils/database');
// const rootDir = require('./utils/path');
const error404 = require('./controllers/controller404');
const User = require('./model/User');


app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) =>  {
    User.findUser("5fc299f4394da112ff74403d")
    .then(user => {
        req.user = user;
        next();
    })
    .catch( err => {
        console.log(err)
        next();
    });
})


app.set('view engine', 'ejs');
app.set('views','views');




app.use('/admin',adminData.routes);
app.use(shopRoutes);
app.use(cartRoutes);
app.use(error404.get404error);





database.database.runDatabase( () => {
    app.listen(process.env.PORT || 3000);
}, (error) => {
    console.log(err);
})
