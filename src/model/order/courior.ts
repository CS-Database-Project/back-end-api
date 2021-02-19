import { ERROR } from '../ERROR';
import { find, insert, update ,deleteData} from '../queryTool';

export interface Courier{
    courierId:string,
    name:string,
}

export class CourierModel{

    static tableName = 'courier';

    static async addCourier(courierDetails: Courier):Promise<[ERROR, Courier[]]>{
        const [error, data] = await insert(this.tableName, courierDetails);
        return [error as ERROR, data as Courier[]];
    }

    static async getCourier(CourierId: string):Promise<[ERROR, Courier[]]>{
        const [error, data] = await find(this.tableName,["*"], "order_id", CourierId);
        return [error as ERROR, data as Courier[]];
    }

    static async updateCourier(CourierId: string, CourierDetails: Courier):Promise<[ERROR, Courier[]]>{
        const [error, data] = await update(this.tableName, CourierDetails, "courier_id", CourierId);
        return [error as ERROR, data as Courier[]];
    }

    static async deleteCourier(id:string){
        const [error,data]=await deleteData(this.tableName,'courier_id',id);
        return [error as ERROR,data];
    }

}