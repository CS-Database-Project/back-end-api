const { Pool } = require('pg');
require('dotenv').config();

export const pool = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME
});

import { CustomerModel } from './customer/customer';
import { CustomerAccountModel } from './customer/customer_account';

import { UserModel } from './user/user';
import { UserAccountModel } from './user/user_account';

import { OrderModel } from './order/order';
import { OrderItemModel } from './order/order_item';
import { OrderItemNoteModel } from './order/order_item_note';
import { OrderStatusModel } from './order/order_status';
import { OrderCourierModel } from './order/order_courier';
import { CourierModel } from './order/courior';

import { ProductModel } from './product/product';
import { ProductVariantModel } from './product/product_variant';
import { ProductReviewModel } from './product/product_review';
import { CustomAttributeModel } from './product/custom_attribute';
import { ProductCustomAttributeModel } from './product/product_custom_attribute';
import { ProductCategoryModel } from './product/product_category';
import { CategoryModel } from './product/category/category';
import { SubCategoryModel } from './product/category/subcategory';
import { User } from './user/user';
import { PlaceOrderModel } from './order/place_order';

export const model = {

    customer: {
        customer: CustomerModel,
        customerAccount: CustomerAccountModel
    },
    
    user: {
        user: UserModel,
        userAccount: UserAccountModel
    },

    order: {
        order: OrderModel,
        orderItem: OrderItemModel,
        orderItemNote: OrderItemNoteModel,
        orderStatus: OrderStatusModel,
        orderCourier: OrderCourierModel,
        courier: CourierModel,
        placeOrder:PlaceOrderModel
    },

    product: {
        product: ProductModel,
        productVariant: ProductVariantModel,
        review: ProductReviewModel,
        customAtrribute:CustomAttributeModel,
        productCustomAttribute:ProductCustomAttributeModel,
        productCategory: ProductCategoryModel,
        category: CategoryModel,
        subCategory: SubCategoryModel
    }

}