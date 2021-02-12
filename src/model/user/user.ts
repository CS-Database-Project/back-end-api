import { find, query, transaction } from '../queryTool';
import { UserAccount, UserAccountModel } from './user_account';
import { generateToken } from './../../utilities/token';
import { ERROR } from '../ERROR';

export interface User{
    userId:string,
    firstName:string,
    lastName:string,
    birthDate:string,
    email: string,
    phone:string,
    address:string,
    city:string,
    state:string
}

interface UserPayload{
    userId:string,
    firstName:string,
    lastName:string,
    birthDate:string,
    email: string,
    phone:string,
    address:string,
    city:string,
    state:string,
    usertype: "Admin"|"Operator"
}

export class UserModel{
    static tableName = 'user';

    static async addUserEntry(userData :User, userAccountData :UserAccount){
        const query1 = `INSERT INTO ${this.tableName}(user_id, first_name, last_name, birth_date,email, phone,address,city,state) VALUES ($1,$2,$3,$4,$5,$6,$7,$8, $9)`;
        const query2 = `INSERT INTO ${UserAccountModel.tableName}(user_id,username,password) VALUES ($1,$2,$3)`;
        const args1= [userData.userId,
                      userData.firstName,
                      userData.lastName,
                      userData.birthDate,
                      userData.email,
                      userData.phone,
                      userData.address,
                      userData.city,
                      userData.state];

        const args2 = [userAccountData.userId,
                       userAccountData.username, 
                       userAccountData.password];
        const error = await transaction([query1, query2],[args1, args2]);
        return error;
    }


    static async findByUserById(userId: string): Promise<[ERROR, User[]]> {
        const [error, data] = await find(this.tableName, [], 'user_id', userId);
        return [error as ERROR, data as User[]];
    }

    static generateToken(userPayload: UserPayload){
        return generateToken(userPayload);
    }

}