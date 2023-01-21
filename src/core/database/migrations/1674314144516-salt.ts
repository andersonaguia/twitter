import { MigrationInterface, QueryRunner } from "typeorm";

export class salt1674314144516 implements MigrationInterface {
    name = 'salt1674314144516'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "salt"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "salt" character varying NOT NULL`);
    }

}
