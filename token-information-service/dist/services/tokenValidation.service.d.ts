export declare class TokenValidationService {
    private keys;
    validateKey(key: string): Promise<{
        isValid: boolean;
        message: string;
        isRateLimited: boolean;
    }>;
}
