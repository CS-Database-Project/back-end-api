import { find, query, transaction,deleteData } from '../queryTool';
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

    static deleteCustomAttribute(id:string){
        const query1= deleteData(this.tableName,'custom_attribute_id',id);
        const query2= deleteData(ProductCustomAttributeModel.tableName,'custom_attribute_id',id);
        return;
    }

    static async findByCustomAttributeById(customAttributeId: string): Promise<[ERROR, CustomAttribute[]]> {
        const [error, data] = await find(this.tableName, [], 'custom_attribute_id', customAttributeId);
        return [error as ERROR, data as CustomAttribute[]];
    }
}
