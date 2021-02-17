<<<<<<< HEAD
import { find, query, transaction } from '../../queryTool';
import { ERROR } from '../../ERROR';
=======
import { find, query, transaction , deleteData,select} from '../../queryTool';
import { ERROR } from '../../ERROR';
import {CategoryModel} from './category'
>>>>>>> 6fb5ec12f9b2d27988b082cefff577ff91e95102

export interface SubCategory{
    subCategoryId:string,
    mainCategoryId :string
}

export interface SubCategoryAdd{
    subCategoryId: string,
    mainCategoryId: string,
    subCategoryName: string
}


export class SubCategoryModel{
    static tableName = 'sub_category';

    static async viewSubCategory(){
        const query= select(this.tableName,['sub_category_id','main_category_id']);
        return query;
    }

    static async addSubCategory(subCategoryData :SubCategoryAdd){
        const query1 = `INSERT INTO ${CategoryModel.tableName}(category_id,name) VALUES ($1,$2)`;
        const query2 = `INSERT INTO ${this.tableName}(sub_category_id,main_category_id) VALUES ($1,$2)`;
        
        const args1 =[subCategoryData.subCategoryId,
                      subCategoryData.subCategoryName]
        const args2= [subCategoryData.subCategoryId,
                      subCategoryData.mainCategoryId];
        
        const error = await transaction([query1, query2],[args1, args2]);
        return error;
    }

    static async deleteSubCategory(id:string){
        const query1= deleteData(this.tableName,'sub_category_id',id);
        const query2= deleteData(CategoryModel.tableName,'category_id',id);
        
        
        return;
    }

    static async findBySubCategoryById(subCategoryId: string): Promise<[ERROR, SubCategory[]]> {
        const [error, data] = await find(this.tableName, [], 'sub_category_id',subCategoryId );
        return [error as ERROR, data as SubCategory[]];
    }
}
