import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddServiceAmharicColumns1788000000000 implements MigrationInterface {
  name = 'AddServiceAmharicColumns1788000000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "services" ADD COLUMN IF NOT EXISTS "pillarTitleAm" varchar(255)`,
    );
    await queryRunner.query(
      `ALTER TABLE "services" ADD COLUMN IF NOT EXISTS "pillarDescriptionAm" text`,
    );
    await queryRunner.query(
      `ALTER TABLE "services" ADD COLUMN IF NOT EXISTS "titleAm" varchar(255)`,
    );
    await queryRunner.query(
      `ALTER TABLE "services" ADD COLUMN IF NOT EXISTS "descriptionAm" text`,
    );
    await queryRunner.query(
      `ALTER TABLE "services" ADD COLUMN IF NOT EXISTS "featuresAm" text`,
    );

    // Pillar title/description became optional in the entity.
    await queryRunner.query(
      `ALTER TABLE "services" ALTER COLUMN "pillarTitle" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "services" ALTER COLUMN "pillarDescription" DROP NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "services" ALTER COLUMN "pillarDescription" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "services" ALTER COLUMN "pillarTitle" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "services" DROP COLUMN IF EXISTS "featuresAm"`,
    );
    await queryRunner.query(
      `ALTER TABLE "services" DROP COLUMN IF EXISTS "descriptionAm"`,
    );
    await queryRunner.query(
      `ALTER TABLE "services" DROP COLUMN IF EXISTS "titleAm"`,
    );
    await queryRunner.query(
      `ALTER TABLE "services" DROP COLUMN IF EXISTS "pillarDescriptionAm"`,
    );
    await queryRunner.query(
      `ALTER TABLE "services" DROP COLUMN IF EXISTS "pillarTitleAm"`,
    );
  }
}
