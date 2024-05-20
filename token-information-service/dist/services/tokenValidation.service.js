"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenValidationService = void 0;
const common_1 = require("@nestjs/common");
let TokenValidationService = class TokenValidationService {
    constructor() {
        this.keys = [
            { key: 'valid-key', rateLimit: 100, expiration: '2024-12-31T23:59:59.000Z', requests: 0 }
        ];
    }
    async validateKey(key) {
        const foundKey = this.keys.find(k => k.key === key);
        if (!foundKey) {
            return { isValid: false, message: 'Invalid key', isRateLimited: false };
        }
        if (new Date(foundKey.expiration) < new Date()) {
            return { isValid: false, message: 'Key expired', isRateLimited: false };
        }
        foundKey.requests += 1;
        if (foundKey.requests > foundKey.rateLimit) {
            return { isValid: true, message: 'Valid key', isRateLimited: true };
        }
        return { isValid: true, message: 'Valid key', isRateLimited: false };
    }
};
exports.TokenValidationService = TokenValidationService;
exports.TokenValidationService = TokenValidationService = __decorate([
    (0, common_1.Injectable)()
], TokenValidationService);
//# sourceMappingURL=tokenValidation.service.js.map