"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class FakeMailProvider {
    constructor() {
        this.messages = [];
    }
    async sendMail(to, body) {
        this.messages.push({
            to,
            body,
        });
    }
}
exports.default = FakeMailProvider;
