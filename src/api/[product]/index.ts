import { Router } from 'express';

import productView from './viewProduct'
import productRegister from './registerProduct';
import productUpdate from './updateProduct';
import productDelete from './deleteProduct';

import productCategoryView from './viewProductCategory';
import productCategoryRegister from './registerProductCategory';
import productCategoryDelete from './deleteProductCategory';

import productVariantView from './viewProductVariant';
import productVariantRegister from './registerProductVariant';
import productVariantUpdate from './updateProductVariant';
import productVariantDelete from './deleteProductVariant';
import productStockUpdate from './updateProductStock';

import productReviewView from './viewProductReview';
import productReviewRegister from './registerProductReview';

import categoryView from './viewCategoryAll';
import mainCategoryRegister from './registerMainCategory';
import categoryUpdate from './updateCategory';
import categoryDelete from './deleteCategory';

import subCategoryView from './viewSubCategory';
import subCategoryRegister from './registerSubCategory';
import subCategoryDelete from './deleteSubCategory';

import customAttributeView from './viewCustomAttributes';
import customAttributeRegister from './registerCustomAttribute';
import customAttributeDelete from './deleteCustomAttribute';

import productCustomAttributeRegister from './registerProductCustomAttribute';
import productCustomAttributeDelete from './deleteProductCustomAttribute';
import searchResult from './search';

var multer  = require('multer');
const path = require('path');

var storage = multer.diskStorage({
    destination: function (req:any, file:any, cb:any) {
        cb(null, './uploads')
    },
    filename: function (req:any, file:any, cb:any) {
        cb(null, req.params.productId + path.extname(file.originalname));
    }
})

var upload = multer({ storage: storage })

const productRouter = Router();


productRouter.get('/product-view',productView);
productRouter.post('/product-register',productRegister);
productRouter.post('/product-register-image/:productId',upload.single('productImage'));
productRouter.put('/product-update/:productId',productUpdate);  //params -> product_id
productRouter.delete('/product-delete/:productId',productDelete);  //params -> product_id

productRouter.get('/product-category_view',productCategoryView);
productRouter.post('/product-category-register/:productId',productCategoryRegister);  //params -> product_id
//productRouter.delete('/product_category_delete/:categoryId',productCategoryDelete);  //params -> category_id

productRouter.get('/product-variant-view',productVariantView);
productRouter.post('/product-variant-register/:productId',productVariantRegister);  //params -> product_id
productRouter.put('/product-variant-update/:productId',productVariantUpdate);  //params -> variant
productRouter.delete('/product-variant-delete/:productId',productVariantDelete); //params -> variant
productRouter.put('/product-stock-update', productStockUpdate);

productRouter.get('/product-review-view',productReviewView);
productRouter.post('/product-review-register/:productId',productReviewRegister);  //params -> product_id

productRouter.get('/category-view',categoryView);
productRouter.post('/main-category-register',mainCategoryRegister);
productRouter.put('/category-update/:categoryId',categoryUpdate);  //params -> category_id
//productRouter.delete('/category_delete/:categoryId',categoryDelete);  //params -> category_id

productRouter.get('/sub-category-view',subCategoryView);
productRouter.post('/sub-category-register',subCategoryRegister);
//productRouter.delete('/sub_category_delete/:subCategoryId',subCategoryDelete);  //params -> sub_category_id

productRouter.get('/custom-attribute-view',customAttributeView);
productRouter.post('/custom-attribute-register',customAttributeRegister);
productRouter.delete('/custom-attribute-delete/:customAttributeId',customAttributeDelete);  //params -> custom_attribute_id

productRouter.post('/product-custom-attribute-register/:productId',productCustomAttributeRegister); //params -> product_id
productRouter.delete('/product-custom-attribute-delete/:customAttributeId',productCustomAttributeDelete);  //params -> custom_attribute_id
productRouter.get('/search/:keyWord',searchResult);


export default productRouter;