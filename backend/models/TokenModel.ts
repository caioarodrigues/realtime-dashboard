import { decode, sign, verify } from 'jsonwebtoken';
import { DotenvConfigOptions } from 'dotenv';
import ITokenController from '../interfaces/ITokenController';
import { OperationResponse } from '../types/Operation';
import { Token } from '../types/Token';
import { GenericUser, User } from '../types/User';

const secret: string = process.env.SECRET || "this isn't a secret lmao";

export default class TokenModel {    
    private static _instance: TokenModel;

    private constructor() {};

    public static getTokenController(): TokenModel {
        if(!this._instance)
            this._instance = new TokenModel();
        
        return this._instance;
    }
    public static getTokenModel() {
        return this.getTokenController();
    }
    public generate(user: GenericUser): Token {
        const token = sign(user, secret, { expiresIn: '3h' });
        
        return token;
    }
    public isValid(token: Token): OperationResponse {
        try{
            const result = verify(token, secret);
            
            console.log(result)
            
            if(typeof result === "object" && result.exp && result.iat){
                const { exp, iat } = result;
                const isExpired = exp < iat;

                if(isExpired){
                    return {
                        message: "the token is expired",
                        success: false
                    }
                }

                return {
                    message: "the token is valid",
                    success: true
                }
            }

            return {
                message: "this token isn't valid",
                success: false
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
            const isValid = this.isValid(token);

            if(isValid){
                const data = verify(token, secret) as string;
                console.log(`data: ${JSON.stringify(data)}`, typeof data);

                if(typeof data === "object"){
                    const { id, username, score, roomID, iat, exp } = data;
                    const user: User = { id, score, username, roomID };
                    
                    return user;
                }
            }

            return null;
        }
        catch(err: unknown) { 
            console.log(`error while trying to decript the token: ${err}`);

            return null;
        }
    }

    public addToBlackList(token: Token): OperationResponse {
        throw new Error('Method not implemented.');
    }
    
}