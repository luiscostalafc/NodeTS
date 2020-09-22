"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
class AlterProviderFieldToProviderId1594425416854 {
    async up(queryRunner) {
        await queryRunner.dropColumn("appointments", "provider");
        await queryRunner.addColumn("appointments", new typeorm_1.TableColumn({
            name: "provider_id",
            type: "uuid",
            isNullable: true,
        }));
        await queryRunner.createForeignKey("appointments", new typeorm_1.TableForeignKey({
            name: "AppointmentProvider",
            columnNames: ["provider_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "users",
            onDelete: "SET NULL",
            onUpdate: "CASCADE",
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropForeignKey("appointments", "AppointmentProvider");
        await queryRunner.dropColumn("appointments", "provider_id");
        await queryRunner.addColumn("appointments", new typeorm_1.TableColumn({
            name: "provider",
            type: "varchar",
        }));
    }
}
exports.default = AlterProviderFieldToProviderId1594425416854;
