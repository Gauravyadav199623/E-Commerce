const path = require('path');

const express = require('express');

// const rootDir = require('../util/path');
const productController=require('../controllers/products');//up one level/controllers file/product

const router = express.Router();



// /admin/add-product => GET
router.get('/add-product',productController.getAddProduct );// don't execute it just pass the reference 

// /admin/add-product => POST
router.post('/add-product', productController.postAddProduct);

module.exports=router
