import { MigrationInterface, QueryRunner } from "typeorm";

export class salt1674396528394 implements MigrationInterface {
    name = 'salt1674396528394'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "salt" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "salt"`);
    }

}
