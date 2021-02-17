import { find, query, transaction ,deleteData,select} from '../../queryTool';
import { ERROR } from '../../ERROR';
import {SubCategoryModel} from './subcategory'

export interface Category{
    mainCategoryId:string,
    name:string
}

export class CategoryModel{
    static tableName = 'category';

    static async viewCategory(){
        const query= select(this.tableName,['category_id','name']);
        return query;
    }

    static async addCategory(categoryData :Category){
        const query = `INSERT INTO ${this.tableName}(category_id,name) VALUES ($1,$2)`;
        const args = [
                      categoryData.mainCategoryId,
                      categoryData.name
                    ]

        const error = await transaction([query],[args]);
        return error;
    }

    static async deleteCategory(id:string){
        const query1= deleteData(this.tableName,'category_id',id);
        const query2= deleteData(SubCategoryModel.tableName,'main_category_id',id);
        return;
    }

    static async findByCategoryById(categoryId: string): Promise<[ERROR, Category[]]> {
        const [error, data] = await find(this.tableName, [], 'category_id', categoryId);
        return [error as ERROR, data as Category[]];
    }
}
