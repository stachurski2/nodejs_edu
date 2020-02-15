const http = require('http');
const express = require('express');
const app = express();
const adminRoutes = require('./routes/admin.js');
const shopRoutes = require('./routes/shop.js');
const path = require('path');
const rootDir = require('./utils/path')

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded())
app.use(express.static(path.join(__dirname, "public")))

app.use('/admin',adminRoutes);
app.use(shopRoutes);

app.use('/', (req,res,next) => {   
   res.status(404).sendFile(path.join(rootDir, 'views', '404.html'))
});

app.listen(3000);