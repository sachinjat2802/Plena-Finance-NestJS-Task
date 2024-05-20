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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenController = void 0;
const common_1 = require("@nestjs/common");
const token_service_1 = require("./token.service");
const create_token_dto_1 = require("./dto/create-token.dto");
const rate_limit_guard_1 = require("../common/guards/rate-limit.guard");
const rate_limit_decorator_1 = require("../common/decorators/rate-limit.decorator");
let TokenController = class TokenController {
    constructor(tokenService) {
        this.tokenService = tokenService;
    }
    async create(createTokenDto) {
        return this.tokenService.create(createTokenDto);
    }
    async getTokenInfo(req, res) {
        const accessKey = req.headers['x-access-key'];
        if (!accessKey || Array.isArray(accessKey)) {
            return res.status(common_1.HttpStatus.BAD_REQUEST).json({ message: 'Invalid access key' });
        }
        const validation = await this.tokenService.validateKey(accessKey);
        if (!validation.isValid) {
            return res.status(common_1.HttpStatus.UNAUTHORIZED).json({ message: 'Invalid or expired access key' });
        }
        const tokenInfo = await this.tokenService.getTokenInfo(accessKey);
        return res.status(common_1.HttpStatus.OK).json(tokenInfo);
    }
};
exports.TokenController = TokenController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_token_dto_1.CreateTokenDto]),
    __metadata("design:returntype", Promise)
], TokenController.prototype, "create", null);
__decorate([
    (0, common_1.UseGuards)(rate_limit_guard_1.RateLimitGuard),
    (0, rate_limit_decorator_1.RateLimit)(100),
    (0, common_1.Get)('info'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], TokenController.prototype, "getTokenInfo", null);
exports.TokenController = TokenController = __decorate([
    (0, common_1.Controller)('tokens'),
    __metadata("design:paramtypes", [token_service_1.TokenService])
], TokenController);
//# sourceMappingURL=token.controller.js.map