import { pool } from './index';
import { convertCamelCaseDeep } from '../utilities/camelCase';
import { convertSnakeCase, convertSnakeCaseDeep } from './../utilities/snakeCase';
import { ERROR } from './ERROR';

export async function query(statement:string, args: any[], expectsData: boolean){
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


export async function transaction(statements:string[], args: any[][]):Promise<any> {
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

export async function select(table:string, columns: string[]){
    const statement = `SELECT ${parseColumns(columns)} FROM ${table};`;
    return await query(statement, [], true);
}

export async function find(table:string, columns:string[], key:string, value:string){
    const statement = `SELECT ${parseColumns(columns)} FROM ${table} WHERE ${convertSnakeCase(key)}=$1;`;
    return await query(statement, [value], true);
}

export async function insert(table:string, data: any){
    const columns: string[] = Object.keys(convertSnakeCaseDeep(data));
    const values:string[] = Object.values(data);
    const statement = `INSERT INTO ${table + parseColumns(columns)} VALUES ${parseValueArguments(columns.length)};`;
    return await query(statement, values, false);
}

export async function update(table:string, data:any, key:string, value:string){
    const columns: string[] = Object.keys(convertSnakeCaseDeep(data)); 
    const values:string[] = Object.values(data);
    const statement = `UPDATE ${table} SET ${parseSetters(columns)} WHERE ${convertSnakeCase(key)}=$${columns.length + 1} RETURNING *;`;
    return await query(statement, [...values, value], true);
}

export async function deleteData(table:string, key:string, value:string){
    const statement = `DELETE FROM ${table} WHERE ${convertSnakeCase(key)}=$1 RETURNING *;`;
    return await query(statement, [value], true);
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

function parseColumns(columns:string[]){
    if(columns.length === 0) return '*';
    let columnsStatement:string = '(';
    for(let column of columns){
        columnsStatement += column + ',';
    }
    return columnsStatement.slice(0, -1) + ')';
}

function parseValueArguments(length:number){
    let values = '(';
    for( let i=1; i<=length; i++){
        values += `$${i},`;
    }
    return values.slice(0, -1) + ')';
}

function parseSetters(columns: string[]){
    let setters = '';
    let index = 1;
    for(let column of columns){
        setters += `${column}=$${index},`;
        index++;
    }
    return setters.slice(0, -1)
}
