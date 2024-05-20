import { TokenValidationService } from '../services/tokenValidation.service';
export declare class TokenInfoController {
    private readonly tokenValidationService;
    constructor(tokenValidationService: TokenValidationService);
    getTokenInfo(req: any, res: any): Promise<any>;
}
