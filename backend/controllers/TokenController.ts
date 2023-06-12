import { Request, Response } from "express";
import TokenModel from "../models/TokenModel";
import { Token } from "../types/Token";
import { GenericUser } from "../types/User";

const tokenModel = TokenModel.getTokenModel();

export default class TokenController {
    public static async generate(user: GenericUser){
        const token = tokenModel.generate(user);

        return token;
    }
    public static async decrypt(token: Token){
        const decrypted = tokenModel.decrypt(token);

        return decrypted;
    }
    public static async isValid(token: Token){
        const result = tokenModel.isValid(token);

        return result;
    }
    public static async addToBlacklist(){}
}