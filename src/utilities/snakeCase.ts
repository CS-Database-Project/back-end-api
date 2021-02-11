import { snakeCase } from 'snake-case';
import  snakeCaseKeys  from 'snakecase-keys';


export function convertSnakeCase(entry:string){
    return snakeCase(entry);
}

export function convertSnakeCaseDeep(object: object){
    return snakeCaseKeys(object);
}