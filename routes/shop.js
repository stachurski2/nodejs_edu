const express = require('express');
const Router = express.Router()
const path = require('path');
const rootDir = require('../utils/path')

 Router.get('/', (req,res,next) => {   
    res.sendFile(path.join(rootDir, 'views', 'shop.html'));
});


module.exports = Router;