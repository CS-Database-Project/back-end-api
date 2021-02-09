import { pool } from './index';
import { convertCamelCaseDeep } from '../utilities/camelCase';
import { ERROR } from './ERROR';

export async function query(statement:string, args: string[], expectsData: boolean){
    try{
        const result= await pool.query(statement, args);
        if(expectsData && result.rows.length === 0){
            return [ERROR.NOT_FOUND, []];
        }
        return [ERROR.NO_ERROR, convertCamelCaseDeep(result.rows)];
    }catch(e){
        return identifyError(e);
    }
}


export async function transaction(statements:string[], args: string[][]):Promise<any> {
    const client = await pool.connect();

    try {
        await client.query('BEGIN');
        while(statements.length>0) await client.query(statements.shift(),args.shift());
        await client.query('COMMIT')
        return ERROR.NO_ERROR;
    } catch (e) {
        client.query('ROLLBACK');
        const [error,data] = identifyError(e);
        return error;
    } finally {
        client.release();
    }  
}


function identifyError(e:any) {
        switch (e.code) {
            case 'ECONNREFUSED':
                console.log("[ERROR][DB]: Couldn't connect to database.")
                return [ERROR.DB_CONNECTION, []];
            case "23505":
                console.log("[ERROR][DB]: Duplicate database entry.")
                return [ERROR.DUPLICATE_ENTRY, []];
            case "23503":
                console.log(e)
                console.log("[ERROR][DB]: Violate Foreign Key Constrain")
                return [ERROR.FOREIGN_KEY, []];
            default:
                console.log(e)
                console.log("[ERROR][DB]: Unknown Error -> ", e.code);
                return [ERROR.UNKNOWN, []];
        }
    
}