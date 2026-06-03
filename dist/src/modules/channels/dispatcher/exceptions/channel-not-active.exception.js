"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChannelNotActiveException = void 0;
const common_1 = require("@nestjs/common");
class ChannelNotActiveException extends common_1.BadRequestException {
    constructor(channel) {
        super(`Channel ${channel} is not yet active. Please configure and verify it in Settings.`);
        this.name = 'ChannelNotActiveException';
    }
}
exports.ChannelNotActiveException = ChannelNotActiveException;
//# sourceMappingURL=channel-not-active.exception.js.map