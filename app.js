const http = require('http');
const express = require('express');
const app = express();
const adminData = require('./routes/admin.js');
const shopRoutes = require('./routes/shop.js');
const path = require('path');
const rootDir = require('./utils/path')
const bodyParser = require('body-parser');

app.engine('pug', require('pug').__express)

app.use(bodyParser.urlencoded());
app.use(express.static(path.join(__dirname, "public")));
app.set('view engine', 'pug');
app.set('views','views');
app.use('/admin',adminData.routes);
app.use(shopRoutes);

app.use('/', (req,res,next) => {   
  // res.status(404).sendFile(path.join(rootDir, 'views', '404.html'));
  res.status(404).render("404");
});

app.listen(process.env.PORT || 3000);