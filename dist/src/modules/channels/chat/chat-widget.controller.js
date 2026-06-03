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
exports.ChatWidgetController = void 0;
const common_1 = require("@nestjs/common");
const fs_1 = require("fs");
const path_1 = require("path");
const public_decorator_1 = require("../../../common/decorators/public.decorator");
let ChatWidgetController = class ChatWidgetController {
    serveWidget(res) {
        try {
            const widgetPath = (0, path_1.join)(__dirname, '..', '..', '..', '..', '..', 'public', 'chat-widget.js');
            const script = (0, fs_1.readFileSync)(widgetPath, 'utf-8');
            res.setHeader('Content-Type', 'application/javascript');
            res.send(script);
        }
        catch (error) {
            try {
                const fallbackPath = (0, path_1.join)(process.cwd(), 'public', 'chat-widget.js');
                const script = (0, fs_1.readFileSync)(fallbackPath, 'utf-8');
                res.setHeader('Content-Type', 'application/javascript');
                res.send(script);
            }
            catch (err) {
                console.error('Widget not found:', error);
                res.status(404).send('Widget script not found');
            }
        }
    }
};
exports.ChatWidgetController = ChatWidgetController;
__decorate([
    (0, common_1.Get)(),
    (0, public_decorator_1.Public)(),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ChatWidgetController.prototype, "serveWidget", null);
exports.ChatWidgetController = ChatWidgetController = __decorate([
    (0, common_1.Controller)('chat-widget.js')
], ChatWidgetController);
//# sourceMappingURL=chat-widget.controller.js.map