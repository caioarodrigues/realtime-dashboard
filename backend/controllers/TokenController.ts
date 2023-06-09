import { decode, sign, verify } from 'jsonwebtoken';
import { DotenvConfigOptions } from 'dotenv';
import ITokenController from '../interfaces/ITokenController';
import { OperationResponse } from '../types/Operation';
import { Token } from '../types/Token';
import { GenericUser } from '../types/User';

const secret: string = process.env.SECRET || "this isn't a secret lmao";

export default class TokenController {
    
    private static _instance: TokenController;

    private constructor() {};

    public static getTokenController(): TokenController {
        if(!this._instance)
            this._instance = new TokenController();
        
        return this._instance;
    }
    
    generate(user: GenericUser): Token {
        const token = sign(user, secret, { expiresIn: '3h' });
        
        return token;
    }
    isValid(token: string): boolean {
        throw new Error('Method not implemented.');
    }
    addToBlackList(token: Token): OperationResponse {
        throw new Error('Method not implemented.');
    }
    
}