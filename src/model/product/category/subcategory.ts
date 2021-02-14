import { find, query, transaction } from '../../queryTool';
import { ERROR } from '../../ERROR';

export interface SubCategory{
    subCategoryId:string,
    mainCategoryId :string
}

export class SubCategoryModel{
    static tableName = 'sub_category';

    static async addSubCategory(subCategoryData :SubCategory){
        const query = `INSERT INTO ${this.tableName}(subCategoryId,mainCategoryId) VALUES ($1,$2)`;
        const args= [subCategoryData.subCategoryId,
                      subCategoryData.mainCategoryId];

        //const error = await transaction([query1, query2],[args1, args2]);
        //return error;
    }

    static async findBySubCategoryById(subCategoryId: string): Promise<[ERROR, SubCategory[]]> {
        const [error, data] = await find(this.tableName, [], 'sub_category_id',subCategoryId );
        return [error as ERROR, data as SubCategory[]];
    }
}
