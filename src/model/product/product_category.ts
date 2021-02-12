import { ERROR } from '../ERROR';
import { find } from '../queryTool';

export interface ProductCategory{
    productId:string,
    categoryId:string,
}

export class ProductCategoryModel{

    static tableName = 'product_category';

    static async findByProductID(productId: string):Promise<[ERROR, ProductCategory[]]>{
        const [error, data] = await find(this.tableName, [], 'product_id', productId);
        return [error as ERROR, data as ProductCategory[]];
    }

}