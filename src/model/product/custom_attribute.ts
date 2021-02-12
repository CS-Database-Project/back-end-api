import { find, query, transaction } from '../queryTool';
import { ERROR } from '../ERROR';



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

        //const error = await transaction([query1, query2],[args1, args2]);
        //return error;
    }

    static async findByCustomAttributeById(customAttributeId: string): Promise<[ERROR, CustomAttribute[]]> {
        const [error, data] = await find(this.tableName, [], 'custom_attribute_id', customAttributeId);
        return [error as ERROR, data as CustomAttribute[]];
    }
}
