import { decode, sign, verify } from 'jsonwebtoken';
import { DotenvConfigOptions } from 'dotenv';
import ITokenController from '../interfaces/ITokenController';
import { OperationResponse } from '../types/Operation';
import { Token } from '../types/Token';
import { GenericUser, User } from '../types/User';

const secret: string = process.env.SECRET || "this isn't a secret lmao";

export default class TokenController {    
    private static _instance: TokenController;

    private constructor() {};

    public static getTokenController(): TokenController {
        if(!this._instance)
            this._instance = new TokenController();
        
        return this._instance;
    }
    
    public generate(user: GenericUser): Token {
        const token = sign(user, secret, { expiresIn: '3h' });
        
        return token;
    }
    public isValid(token: Token): OperationResponse {
        try{
            const result = verify(token, secret);

            return {
                message: "this token is valid",
                success: true
            };
        }
        catch(err){
            return {
                message: "this token isn't valid!",
                success: false
            };
        }
    }
    public decrypt(token: Token): User | null{
        try{
            const data = verify(token, secret) as string;
            const obj = JSON.parse(data) as User;

            console.log(`data: ${obj}`);

            return obj;
        }
        catch(err) { 
            return null;
        }
    }

    public addToBlackList(token: Token): OperationResponse {
        throw new Error('Method not implemented.');
    }
    
}