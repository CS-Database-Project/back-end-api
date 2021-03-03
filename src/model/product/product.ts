import { find, query, transaction, deleteData,update,select} from '../queryTool';
import { ProductVariant, ProductVariantModel } from './product_variant';
import {ProductCategoryModel} from './product_category';
import {CategoryModel} from './category/category';
import {ProductReviewModel} from './product_review';
import { ERROR } from '../ERROR';
import { CustomerModel } from '../customer/customer';
import { ProductCustomAttribute, ProductCustomAttributeModel } from './product_custom_attribute';



export interface Product{
    productId:string,
    title:string,
    sku: string,
    weight: number,
    description: string
}

export class ProductModel{
    static tableName = 'product';

    static async getProductDetails(){
        const statement=   `SELECT 
	                            product_id,
	                            title,
                                p.description,
                                p.weight,
                                p.sku,
                                p.deleted,
                                (SELECT 
                                    COALESCE(json_agg(json_build_object('rating', rating,'description' ,pr.description)) FILTER (WHERE pr.rating IS NOT NULL), '[]') AS reviews
                                    FROM ${this.tableName}
                                LEFT JOIN ${ProductReviewModel.tableName} pr USING(product_id)
                                LEFT JOIN ${CustomerModel.tableName} USING(customer_id)
                                WHERE product_id = p.product_id
                                GROUP BY product_id) AS reviews,
                                (SELECT 
                                    json_agg(category_id)
                                FROM ${this.tableName} 
                                LEFT JOIN ${ProductCategoryModel.tableName} USING(product_id)
                                WHERE product_id=p.product_id
                                GROUP BY product_id
                                ) AS categories,
                                (SELECT 
                                    json_agg(json_build_object('name', variant_name, 'unitPrice', unit_price, 'countInStock',count_in_stock))
                                FROM ${this.tableName}
                                LEFT JOIN ${ProductVariantModel.tableName} USING(product_id)
                                WHERE product_id=p.product_id
                                GROUP BY product_id
                                ) AS variants
                            FROM ${this.tableName} p`;
        const [error, data] = await query(statement, [], true);
        return [error as ERROR, data];
    }
    
    static async addProduct(productData: any,productVariants:any, productCategories:any ,productCustomAttributes: any){
        const query1= `INSERT INTO ${this.tableName}(product_id,title,sku,weight,description) VALUES ($1,$2,$3,$4,$5)`;
        const query2 = `INSERT INTO ${ProductVariantModel.tableName}(product_id,variant_name,unit_price,count_in_stock) VALUES ${getVariants(productVariants, productData.productId)};`;
        const query3 = `INSERT INTO ${ProductCategoryModel.tableName}(product_id, category_id)  VALUES ${getCategories(productCategories, productData.productId)};`
        const query4 = `INSERT INTO ${ProductCustomAttributeModel.tableName}(product_id, custom_attribute_id, value)  VALUES ${getCustomAttributes(productCustomAttributes, productData.productId)};`

        const args1= [productData.productId,
                      productData.title,
                      productData.sku,
                      productData.weight.toString(),
                      productData.description];

        const error = await transaction([query1, query2, query3, query4],[args1, [], [], []]);
        return error;
    }

    static async deleteProduct(id:string){
        const [error, data] = await update(this.tableName, {deleted: true}, 'product_id', id);
        return error;
    }

    static async updateProduct(productData :Product,id:string){
        const [error, data]= await update(this.tableName,productData,'product_id',id);
        return  [error as ERROR, data];

    }

    static async findByProductById(productId: string): Promise<[ERROR, Product[]]> {
        const [error, data] = await find(this.tableName, [], 'product_id', productId);
        return [error as ERROR, data as Product[]];
    }
}


function getVariants(productVariants:any, id:any){
    let values = '';

    for(let i=0;i<productVariants.length; i++){
        const {name, unitPrice, countInStock } = productVariants[i];
        if(i !==0){
            values = values + `,('${id}', '${name}', ${unitPrice}, ${countInStock})`
        }else{
            values = values + `('${id}', '${name}', ${unitPrice}, ${countInStock})`
        }
        
    }
    return values;

}



function getCategories(productCategories:any, id:any){
    let values = '';
    for(let i=0; i< productCategories.length; i++){
        if(i !==0 ){
            values = values + `,('${id}', '${productCategories[i]}')`
        }else{
            values = values + `('${id}', '${productCategories[i]}')`
        }
    }

    return values;
}

function getCustomAttributes(productCustomAttributes: any, id: any){
    let values = '';
    for(let i=0; i< productCustomAttributes.length; i++){
        const {value, customAttributeId } = productCustomAttributes[i];
        if(i !==0 ){
            values = values + `,('${id}', '${customAttributeId}', '${value}')`
        }else{
            values = values + `('${id}', '${customAttributeId}', '${value}')`
        }
    }

    return values;

}