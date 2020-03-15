const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const adminData = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const rootDir = require('./utils/path');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, "public")));
app.set('view engine', 'ejs');
app.set('views','views');

app.use('/admin',adminData.routes);
app.use(shopRoutes);

app.use('/', (req,res,next) => {   
  res.status(404).render('404', { pageTitle: 'Page Not Found sdmaskdksa' });
});

app.listen(process.env.PORT || 3000);