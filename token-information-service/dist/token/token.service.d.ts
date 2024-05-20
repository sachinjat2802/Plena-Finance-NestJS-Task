import { Repository } from 'typeorm';
import { CreateTokenDto } from './dto/create-token.dto';
import { Token } from './entities/token.entity';
export declare class TokenService {
    private tokenRepository;
    constructor(tokenRepository: Repository<Token>);
    create(createTokenDto: CreateTokenDto): Promise<Token>;
    validateKey(key: string): Promise<{
        isValid: boolean;
    }>;
    getTokenInfo(key: string): Promise<any>;
}
