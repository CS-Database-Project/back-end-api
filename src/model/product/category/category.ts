import { find, query, transaction ,deleteData,select,update} from '../../queryTool';
import { ERROR } from '../../ERROR';
import {SubCategoryModel} from './subcategory'

export interface Category{
    mainCategoryId:string,
    name:string
}

export interface UpdateCategory{
    name:string
}

export class CategoryModel{
    static tableName = 'category';

    static async getAllCategories(){
        const statement =  `SELECT 
	                            json_build_object('categoryId', category_id,'name', name) AS category,
	                            json_agg((SELECT json_build_object('categoryId', category_id, 'name', name) FROM category WHERE category_id = sc.sub_category_id)) AS sub_categories
                            FROM category c
                            LEFT JOIN sub_category sc ON c.category_id=sc.main_category_id
                            WHERE category_id NOT IN (SELECT sub_category_id FROM sub_category)
                            GROUP BY category_id`
        const [error, data] = await query(statement, [], true);
        return [error as ERROR, data];
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

    static async updateCategory(categoryData:UpdateCategory,id:string){
        const [error, data]= await update(this.tableName,categoryData,'category_id',id);
        return  [error as ERROR, data];

    }


    static async deleteCategory(id:string){
        //const [error1,data1]= await deleteData(this.tableName,'category_id',id);
        //const [error2,data2]= await deleteData(SubCategoryModel.tableName,'main_category_id',id);

        const query1 =`DELETE FROM ${this.tableName} WHERE category_id=$1`;
        const query2 =`DELETE FROM ${SubCategoryModel.tableName} WHERE main_category_id=$1`;

        const args1=[id];
        const args2=[id];

        const error= transaction([query1,query2],[args1,args2]);
        return error;

        //return [error1 as ERROR,data1,data2];
    }

    static async findByCategoryById(categoryId: string): Promise<[ERROR, Category[]]> {
        const [error, data] = await find(this.tableName, [], 'category_id', categoryId);
        return [error as ERROR, data as Category[]];
    }
}
