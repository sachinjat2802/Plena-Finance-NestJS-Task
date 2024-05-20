import { TokenService } from './token.service';
import { CreateTokenDto } from './dto/create-token.dto';
import { Response } from 'express';
export declare class TokenController {
    private readonly tokenService;
    constructor(tokenService: TokenService);
    create(createTokenDto: CreateTokenDto): Promise<import("./entities/token.entity").Token>;
    getTokenInfo(req: any, res: Response): Promise<Response<any, Record<string, any>>>;
}
