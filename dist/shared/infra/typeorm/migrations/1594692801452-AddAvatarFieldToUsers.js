"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
class AddAvatarFieldToUsers1594692801452 {
    async up(queryRunner) {
        await queryRunner.addColumn("users", new typeorm_1.TableColumn({
            name: "avatar",
            type: "varchar",
            isNullable: true,
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropColumn("users", "avatar");
    }
}
exports.default = AddAvatarFieldToUsers1594692801452;
