import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { buildTypeOrmOptions } from './typeorm-options';

/**
 * Standalone DataSource for the TypeORM CLI (migration:run / revert /
 * show). It reads the same options as the running server via
 * `buildTypeOrmOptions`, so it can never point at a different database.
 *
 * The CLI is not a Nest application, so it does not load ConfigModule's
 * .env file. Either export the DB_* variables in your shell first, or pass
 * them inline:
 *
 *   $env:DB_HOST='localhost'; npm run migration:run
 */
// Must be the ONLY DataSource export in this file. The TypeORM CLI refuses
// to load a data source module that exports more than one instance, so do
// not add a `export default` alias here.
export const AppDataSource = new DataSource(
  buildTypeOrmOptions({
    get: (key: string, defaultValue?: unknown) =>
      process.env[key] ?? defaultValue,
  }),
);
