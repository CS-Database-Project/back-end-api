import camelcase from 'camelcase';
import camelcaseKeys from 'camelcase-keys';


export function convertCamelCase(entry:string){
    return camelcase(entry);
}

export function convertCamelCaseDeep(object:Object) {
    return camelcaseKeys(object);
}