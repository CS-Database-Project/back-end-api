import { ERROR } from '../ERROR';
import { find,transaction,deleteData,select} from '../queryTool';

export interface ProductCategory{
    productId:string,
    categoryId:string,
}

export class ProductCategoryModel{

    static tableName = 'product_category';

    static async viewProductCategory(){
        const [error, data]= await select(this.tableName,['product_id','category_id']);
        return [error as ERROR, data];
    }

    static async addProductCategory(productCategoryData: ProductCategory){
        const query = `INSERT INTO ${this.tableName}(product_id,category_id) VALUES ($1,$2)`;
        const args = [
                      productCategoryData.productId,
                      productCategoryData.categoryId
                    ]

        const error = await transaction([query],[args]);
        return error;
    }

    static async deleteProductCategory(id:string){
        const [error, data]= await deleteData(this.tableName,'category_id',id);
        return [error as ERROR, data];
    }


    static async findByProductID(productId: string):Promise<[ERROR, ProductCategory[]]>{
        const [error, data] = await find(this.tableName, [], 'product_id', productId);
        return [error as ERROR, data as ProductCategory[]];
    }

}