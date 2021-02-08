import { ResponseGenerator } from "./responseGenerator";

export class StatusCode{
    private _code: number;
    private readonly parent: ResponseGenerator;

    constructor(_code: number, parent: ResponseGenerator){
        this._code = _code;
        this.parent = parent;
    }

    get code(){
        return this._code;
    }

    OK(): ResponseGenerator{
        return this.setCode(200);
    }

    CREATED(): ResponseGenerator {
        return this.setCode(201);
    }

    NO_CONTENT(): ResponseGenerator {
        return this.setCode(204);
    }

    MV_PERM(): ResponseGenerator {
        return this.setCode(301);
    }

    NOT_MOD(): ResponseGenerator {
        return this.setCode(304);
    }

    BAD_REQUEST(){
        return this.setCode(400);
    }

    UNAUTHORIZED(){
        return this.setCode(401);
    }

    FORBIDDEN(){
        return this.setCode(403);
    }

    NOT_FOUND(){
        return this.setCode(404);
    }

    ERROR(){
        return this.setCode(500);
    }

    private setCode(_code:number): ResponseGenerator{
        this._code = _code;
        return this.parent;
    }

}