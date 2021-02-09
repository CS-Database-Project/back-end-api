require('dotenv').config();
import  jwt  from 'jsonwebtoken';

const privateKey = process.env.JWT_PRIVATE_KEY || "Secret";

export function generateToken(payload: any){
    return jwt.sign(payload, privateKey);
}




