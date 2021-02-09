require('dotenv').config();
import { hash, genSalt } from 'bcrypt';

const saltRounds = parseInt(process.env.SALT_ROUNDS || "10");

export async function encryptPassword(password: string){
    try{
        const salt = await genSalt(saltRounds);
        return await hash(password, salt);
    }catch(ex){
        console.log(ex);
        return ex;
    }
   
}