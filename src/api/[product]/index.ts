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

import productReviewView from './viewProductReview';
import productReviewRegister from './registerProductReview';

import categoryView from './viewCategory';
import mainCategoryRegister from './registerMainCategory';
import categoryDelete from './deleteCategory';

import subCategoryView from './viewSubCategory';
import subCategoryRegister from './registerSubCategory';
import subCategoryDelete from './deleteSubCategory';

import customAttributeRegister from './registerCustomAttribute';
import customAttributeDelete from './deleteCustomAttribute';

import productCustomAttributeRegister from './registerProductCustomAttribute';
import productCustomAttributeDelete from './deleteProductCustomAttribute';


const productRouter = Router();


productRouter.get('/product_view',productView);
productRouter.post('/product_register',productRegister);
productRouter.put('/product_update/:id',productUpdate);  //params -> product_id
productRouter.delete('/product_delete/:id',productDelete);  //params -> product_id

productRouter.get('/product_category_view',productCategoryView);
productRouter.post('/product_category_register/:id',productCategoryRegister);  //params -> product_id
productRouter.delete('/product_category_delete/:id',productCategoryDelete);  //params -> category_id

productRouter.get('/product_variant_view',productVariantView);
productRouter.post('/product_variant_register/:id',productVariantRegister);  //params -> product_id
productRouter.put('/product_variant_update/:id',productVariantUpdate);  //params -> product_id
productRouter.delete('/product_variant_delete/:id',productVariantDelete); //params -> product_id

productRouter.get('/product_review_view',productReviewView);
productRouter.post('/product_review_register/:id',productReviewRegister);  //params -> product_id

productRouter.get('/category_view',categoryView);
productRouter.post('/main_category_register',mainCategoryRegister);
productRouter.delete('/category_delete/:id',categoryDelete);  //params -> category_id

productRouter.get('/sub_category_view',subCategoryView);
productRouter.post('/sub_category_register',subCategoryRegister);
productRouter.delete('/sub_category_delete/:id',subCategoryDelete);  //params -> sub_category_id

productRouter.post('/custom_attribute_register',customAttributeRegister);
productRouter.delete('/custom_attribute_delete/:id',customAttributeDelete);  //params -> custom_attribute_id

productRouter.post('/product_custom_attribute_register/:id',productCustomAttributeRegister); //params -> product_id
productRouter.delete('/product_custom_attribute_delete/:id',productCustomAttributeDelete);  //params -> custom_attribute_id


export default productRouter;