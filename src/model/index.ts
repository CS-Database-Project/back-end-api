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

export const model = {
    customer: {
        customer: CustomerModel,
        customerAccount: CustomerAccountModel
    }
}