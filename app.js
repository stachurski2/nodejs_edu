const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const product = require('./model/product.js');
const app = express();
const adminData = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const cartRoutes = require('./routes/cart');

const rootDir = require('./utils/path');
const error404 = require('./controllers/controller404')

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, "public")));
app.set('view engine', 'ejs');
app.set('views','views');

app.use('/admin',adminData.routes);
app.use(shopRoutes);
app.use(cartRoutes);

app.use(error404.get404error);

app.listen(process.env.PORT || 3000);