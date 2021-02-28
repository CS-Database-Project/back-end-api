import { find, query, transaction, update } from '../queryTool';
import { UserAccount, UserAccountModel } from './user_account';
import { generateToken } from './../../utilities/token';
import { ERROR } from '../ERROR';
import { convertSnakeCase } from './../../utilities/snakeCase';

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
    usertype: "Administrator"
}

export class UserModel{
    static tableName = 'user_details';

    static async addUserEntry(userData :User, userAccountData :UserAccount){
        const query1 = `INSERT INTO ${this.tableName}(user_id, first_name, last_name, birth_date,email, phone,address,city,state) VALUES ($1,$2,$3,$4,$5,$6,$7,$8, $9)`;
        const query2 = `INSERT INTO ${UserAccountModel.tableName}(user_id,username,password, active_status, usertype) VALUES ($1,$2,$3,$4,$5)`;
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
                       userAccountData.password,
                       userAccountData.activeStatus ? 'true' : 'false',
                       userAccountData.usertype
                    ];
        const error = await transaction([query1, query2],[args1, args2]);
        return error;
    }


    static async findByUserById(userId: string): Promise<[ERROR, User[]]> {
        const statement = `SELECT 
                                ${this.tableName}.*, 
                                ${UserAccountModel.tableName}.usertype, 
                                ${UserAccountModel.tableName}.active_status 
                            FROM ${this.tableName}
                            JOIN ${UserAccountModel.tableName} USING(user_id)
                            WHERE user_id='${userId}';`
        const [error, data] = await query(statement, [], true);
        return [error as ERROR, data as User[]];
    }

    static async getAllUsers(): Promise<[ERROR, any]> {
        const statement = `SELECT ${this.tableName}.*,${UserAccountModel.tableName}.usertype, ${UserAccountModel.tableName}.username, ${UserAccountModel.tableName}.active_status FROM ${this.tableName} JOIN ${UserAccountModel.tableName} USING(user_id);`
        const [error, data] = await query(statement, [], true);
        return [error as ERROR, data];
    }

    static async getSortedUsersByQuery(key:string, value:string) {
        const statement = `SELECT * FROM ${this.tableName} JOIN ${UserAccountModel.tableName} USING(user_id) WHERE ${convertSnakeCase(key)}=$1;`
        const [error, data] = await query(statement, [value], true);
        return [error as ERROR, data];
    }

    static async updateUserDetails(userData: User){
        const [error, data] = await update(this.tableName, userData, 'userId', userData.userId);
        return error; 
    }

    static generateToken(userPayload: UserPayload){
        return generateToken(userPayload);
    }

}
