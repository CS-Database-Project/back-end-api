import { find, query, transaction , deleteData,select} from '../../queryTool';
import { ERROR } from '../../ERROR';
import {CategoryModel} from './category'

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
        const [error,data]= await select(this.tableName,['sub_category_id','main_category_id']);
        return [error as ERROR,data];
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
        //const [error1,data1]= await deleteData(this.tableName,'sub_category_id',id);
        //const [error2,data2]= await deleteData(CategoryModel.tableName,'category_id',id);

        const query1 =`DELETE FROM ${this.tableName} WHERE sub_category_id=$1`;
        const query2 =`DELETE FROM ${CategoryModel.tableName} WHERE category_id=$1`;

        const args1=[id];
        const args2=[id];

        const error= transaction([query1,query2],[args1,args2]);
        return error;

        //return [error1 as ERROR ,data1,data2];
    }

    static async findBySubCategoryById(subCategoryId: string): Promise<[ERROR, SubCategory[]]> {
        const [error, data] = await find(this.tableName, [], 'sub_category_id',subCategoryId );
        return [error as ERROR, data as SubCategory[]];
    }
}
