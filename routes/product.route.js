const express = require('express');
const router = express.Router();

const productController = require('../controllers/product.controller');

router.get('/', productController.findAll);
router.get('/:product', productController.findOne);
router.post('/', productController.update);
router.patch('/:product', productController.update);
router.delete('/product', productController.delete);

module.exports = router