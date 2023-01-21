import { MigrationInterface, QueryRunner } from "typeorm";

export class initial1674312906752 implements MigrationInterface {
    name = 'initial1674312906752'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "name" character varying(100) NOT NULL, "usuario" character varying(50) NOT NULL, "email" character varying(255) NOT NULL, "password" character varying NOT NULL, "salt" character varying NOT NULL, "ativo" boolean NOT NULL DEFAULT true, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tweets" ("id" SERIAL NOT NULL, "tweet" character varying(280) NOT NULL, "createdDate" TIMESTAMP NOT NULL DEFAULT now(), "user_id" integer, CONSTRAINT "PK_19d841599ad812c558807aec76c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "tweets" ADD CONSTRAINT "FK_0a23c50228c2db732e3214682b0" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tweets" DROP CONSTRAINT "FK_0a23c50228c2db732e3214682b0"`);
        await queryRunner.query(`DROP TABLE "tweets"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
