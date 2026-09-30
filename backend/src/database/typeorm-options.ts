import { join } from 'path';
import { DataSourceOptions } from 'typeorm';
import { ContactSubmission } from '../entities/contact-submission.entity';
import { Project } from '../entities/project.entity';
import { Service } from '../entities/service.entity';
import { AboutSection } from '../entities/about-section.entity';
import { News } from '../entities/news.entity';
import { Gallery } from '../entities/gallery.entity';
import { HomeSection } from '../entities/home-content.entity';
import { UnansweredQuery } from '../entities/unanswered-query.entity';
import { User } from '../entities/user.entity';
import { TeamMember } from '../entities/team-member.entity';

export const ENTITIES = [
  ContactSubmission,
  Project,
  Service,
  AboutSection,
  News,
  Gallery,
  HomeSection,
  UnansweredQuery,
  User,
  TeamMember,
];

/**
 * Single source of truth for the database connection.
 *
 * Both `AppModule` (the running server) and the migration CLI's
 * `data-source.ts` call this. That is deliberate: an earlier version had
 * the connection options inline in `app.module.ts` and a near-identical
 * copy in the CLI, and the two disagreed on the default database name.
 * One function makes that class of bug impossible.
 */
/**
 * Returned as `DataSourceOptions` rather than `TypeOrmModuleOptions`
 * because that is the narrower of the two types, and it is the one both
 * `TypeOrmModule.forRoot` and `new DataSource()` accept. Returning the
 * Nest-specific type would not compile against the migration CLI.
 */
export function buildTypeOrmOptions(
  configService: { get: (key: string, defaultValue?: unknown) => unknown },
): DataSourceOptions {
  // cPanel's UI happily saves a variable with an empty value, and blank is
  // not the same as absent. `configService.get('DB_DATABASE', 'bykm_group')`
  // returns '' in that case, not the default, and the app would try to
  // connect to a database with no name. Treat blank as unset.
  const str = (key: string, fallback: string): string => {
    const v = configService.get(key, fallback);
    return typeof v === 'string' && v.trim() !== '' ? v : fallback;
  };

  const nodeEnv = str('NODE_ENV', 'development');
  const isProd = nodeEnv === 'production';

  // Escape hatch: set DB_SYNC=true in production for a one-off schema
  // repair, then unset it. Do NOT leave this on — `synchronize` can drop
  // or alter existing columns. Migrations are the safe route.
  const forceSync = str('DB_SYNC', '') === 'true';

  // `+''` is 0, which is not a valid port, so a blank DB_PORT must not win.
  const rawPort = +configService.get('DB_PORT', 5432)!;

  return {
    type: 'postgres',
    host: str('DB_HOST', 'localhost'),
    // env vars arrive as strings; TypeORM needs a real number
    port: Number.isInteger(rawPort) && rawPort > 0 ? rawPort : 5432,
    username: str('DB_USERNAME', 'postgres'),
    password: configService.get('DB_PASSWORD') as string | undefined,
    database: str('DB_DATABASE', 'bykm_group'),
    entities: ENTITIES,

    // Schema changes come from migrations, never from synchronize, in prod.
    synchronize: forceSync || !isProd,

    // Dev: log every query. Anywhere else: only errors and warnings, so the
    // failing SQL behind a 500 is recorded in stderr.log without flooding it.
    logging: nodeEnv === 'development' ? true : ['error', 'warn'],

    migrations: [join(__dirname, 'migrations', '*.{ts,js}')],

    // Apply pending migrations on boot. This is what makes cPanel work
    // without SSH: TypeORM records what it has run in a `migrations`
    // table and only applies what is missing, so this is safe to leave on.
    // Set DB_MIGRATE=false to take manual control.
    migrationsRun: isProd && str('DB_MIGRATE', 'true') !== 'false',
  };
}
