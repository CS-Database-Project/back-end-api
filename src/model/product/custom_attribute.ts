import { find, query, transaction,deleteData, select } from '../queryTool';
import { ERROR } from '../ERROR';
import { ProductCustomAttributeModel } from './product_custom_attribute';


export interface CustomAttribute{
    customAttributeId:string,
    name:string,
    dataType: string
}

export class CustomAttributeModel{
    static tableName = 'custom_attribute';

    static async addCustomAttribute(customAtrributeData :CustomAttribute){
        const query = `INSERT INTO ${this.tableName}(custom_attribute_id,name,data_type) VALUES ($1,$2,$3)`;
        const args= [customAtrributeData.customAttributeId,
                      customAtrributeData.name,
                      customAtrributeData.dataType];

        const error = await transaction([query],[args]);
        return error;
    }

    static async deleteCustomAttribute(id:string){
        //const [error1,data1]= await deleteData(this.tableName,'custom_attribute_id',id);
        //const [error2,data2]= await deleteData(ProductCustomAttributeModel.tableName,'custom_attribute_id',id);

        const query1 = `DELETE FROM ${this.tableName} WHERE custom_attribute_id=$1`;
        const query2 = `DELETE FROM ${ProductCustomAttributeModel.tableName} WHERE custom_attribute_id=$1`;

        const args1= [id];
        const args2 =[id];

        const error = transaction([query1,query2],[args1,args2])
        return error;

        //return [error1 as ERROR, data1, data2];
    }

    static async findByCustomAttributeById(customAttributeId: string): Promise<[ERROR, CustomAttribute[]]> {
        const [error, data] = await find(this.tableName, [], 'custom_attribute_id', customAttributeId);
        return [error as ERROR, data as CustomAttribute[]];
    }

    static async getAllCustomAttributes(): Promise<[ERROR, CustomAttribute[]]>{
        const [error, data] = await select(this.tableName, []);
        return [error as ERROR, data as CustomAttribute[]];
    }
}
