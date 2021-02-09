import { EResponse } from "../types";
import { ResponseInformation } from './index';
import { StatusCode } from './statusCode';


export class ResponseGenerator{
    readonly status: StatusCode;

    private res: EResponse;
    private readonly _data: ResponseInformation;

    constructor(res: EResponse){
        this.status = new StatusCode(500, this);
        this.res = res;
        this._data = { message: "Success..."};   
    }

    send(): void{
        this.res.status(this.status.code);
        this.res.json(this._data);
    }

    token(token: string): ResponseGenerator{
        this._data.token = token;
        return this;
    }

    message(message: string): ResponseGenerator{
        this._data.message = message;
        return this;
    }

    data(data: any){
        this._data.data = data;
        return this;
    }

    prebuild(): ResponseGenerator{
        return this.status.
                    ERROR().
                    message("Internel Server Error...");
    }
}