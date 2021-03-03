import { find, query, transaction, deleteData,update,select} from '../queryTool';
import { ProductVariant, ProductVariantModel } from './product_variant';
import {ProductCategoryModel} from './product_category';
import {CategoryModel} from './category/category';
import {ProductReviewModel} from './product_review';
import { ERROR } from '../ERROR';
import { CustomerModel } from '../customer/customer';



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
    
    static async addProduct(productData :Product, productVariantData: ProductVariant){
        const query1= `INSERT INTO ${this.tableName}(product_id,title,sku,weight,description) VALUES ($1,$2,$3,$4,$5)`;
        const query2 = `INSERT INTO ${ProductVariantModel.tableName}(product_id,variant_name,unit_price,count_in_stock) VALUES ($1,$2,$3,$4)`;
    
        const args1= [productData.productId,
                      productData.title,
                      productData.sku,
                      productData.weight.toString(),
                      productData.description];

        const args2= [productVariantData.productId,
                      productVariantData.variantName,
                      productVariantData.unitPrice.toString(),
                      productVariantData.countInStock.toString()];

        const error = await transaction([query1, query2],[args1, args2]);
        return error;
    }

    static async deleteProduct(id:string){
        //const [error4,data4] = await deleteData(ProductReviewModel.tableName,'product_id',id);
        //const [error3,data3] = await deleteData(ProductCategoryModel.tableName,'product_id',id);
        //const [error2,data2] = await deleteData(ProductVariantModel.tableName,'product_id',id);
        //const [error1,data1]= await deleteData(this.tableName,'product_id',id);

        const query1= `DELETE FROM ${this.tableName} WHERE product_id=$1`;
        const query2= `DELETE FROM ${ProductVariantModel.tableName} WHERE product_id=$1`;
        const query3= `DELETE FROM ${ProductCategoryModel.tableName} WHERE product_id=$1`;
        const query4= `DELETE FROM ${ProductReviewModel.tableName} WHERE product_id=$1`;
        
        const args1 =[id];
        const args2 =[id];
        const args3 =[id];
        const args4 =[id];

        const error = await transaction([query4,query3,query2,query1],[args4,args3,args2,args1]);
        return error;

       // return [error1 as ERROR,data1,data2,data3];
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
