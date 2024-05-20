"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RateLimitMiddleware = void 0;
const common_1 = require("@nestjs/common");
const tokenValidation_service_1 = require("../services/tokenValidation.service");
let RateLimitMiddleware = class RateLimitMiddleware {
    constructor(tokenValidationService) {
        this.tokenValidationService = tokenValidationService;
    }
    async use(req, res, next) {
        const accessKey = req.headers['x-access-key'].toString();
        const validation = await this.tokenValidationService.validateKey(accessKey);
        if (!validation.isValid) {
            return res.status(401).json({ message: validation.message });
        }
        if (validation.isRateLimited) {
            return res.status(429).json({ message: 'Rate limit exceeded' });
        }
        next();
    }
};
exports.RateLimitMiddleware = RateLimitMiddleware;
exports.RateLimitMiddleware = RateLimitMiddleware = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [tokenValidation_service_1.TokenValidationService])
], RateLimitMiddleware);
//# sourceMappingURL=rateLimit.middleware.js.map