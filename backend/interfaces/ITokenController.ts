import TokenModel from "../models/TokenModel";
import { OperationResponse } from "../types/Operation";
import { Token } from "../types/Token";
import { GenericUser } from "../types/User";

export default interface ITokenController {
    _instance: TokenModel;

    getTokenController(): TokenModel;
    generate (user: GenericUser): Token;
    isValid(token: Token): boolean;
    addToBlackList(token: Token): OperationResponse;
}