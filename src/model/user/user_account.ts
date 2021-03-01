import { ERROR } from '../ERROR';
import { find,query, update } from '../queryTool';

export interface UserAccount{
    userId:string,
    username:string,
    password:string,
    activeStatus:boolean,
    usertype:string
}

export class UserAccountModel{

    static tableName = 'user_account';

    static async findByUsername(username: string):Promise<[ERROR, UserAccount[]]>{
        const [error, data] = await find(this.tableName, [], 'username', username);
        return [error as ERROR, data as UserAccount[]];
    }

    static async changeAccountStatus(userId:string, activeStatus:boolean):Promise<ERROR>{
        const [error,data] = await update(this.tableName,{userId,activeStatus}, 'userId', userId);
        return error as ERROR;
    }

    static async updateUsername(oldUsername: string, newUsername: string){
        const [error, data] = await update(this.tableName, { username: newUsername}, 'username', oldUsername);
        return [error,data];
    }

    static async updatePassword(newPassword: string, username: string){
        const [error, data] = await update(this.tableName, { password: newPassword}, 'username', username);
        return [error,data];
    }

    static async updateUsertype(userId: string, usertype: string){
        const [error, data] = await update(this.tableName, { usertype }, 'user_id', userId);
        return error;
    }

}