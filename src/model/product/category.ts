import { find, query, transaction } from '../queryTool';
import { ERROR } from '../ERROR';



export interface Category{
    categoryId:string,
    name:string
}

export class CategoryModel{
    static tableName = 'category';

    static async addCategory(categoryData :Category){
        const query = `INSERT INTO ${this.tableName}(category_id,name) VALUES ($1,$2)`;
        const args= [categoryData.categoryId,
                      categoryData.name];

        //const error = await transaction([query1, query2],[args1, args2]);
        //return error;
    }

    static async findByCategoryById(categoryId: string): Promise<[ERROR, Category[]]> {
        const [error, data] = await find(this.tableName, [], 'category_id', categoryId);
        return [error as ERROR, data as Category[]];
    }
}
