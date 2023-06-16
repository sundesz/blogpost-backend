import { ConnectionError, Sequelize } from 'sequelize';
import { DB_HOST, DB_NAME, DB_PASSWORD, DB_USER } from '../config';
import { Umzug, SequelizeStorage } from 'umzug';
import { logErrorMessage } from '../utils/loggers';

/**
 *
 */
export const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: 'postgres',
  dialectOptions: {
    // ssl: {
    //   require: true,
    //   rejectUnauthorized: false,
    // },
  },
  logging: process.env.NODE_ENV === 'prod' ? false : console.log,
});

enum LocationTyp {
  'MIGRATION' = 'migrations',
  'SEEDER' = 'seeders',
}

type LocationType = 'migrations' | 'seeders';

const migrationConf = (location: LocationType) => {
  const tableName =
    LocationTyp.MIGRATION === location ? 'migration' : 'seeder_meta';

  return {
    migrations: { glob: `src/db/${location}/*.{js,ts}` },
    storage: new SequelizeStorage({ sequelize, tableName }),
    context: sequelize.getQueryInterface(),
    logger: console,
  };
};

const migrationUmzug = new Umzug(migrationConf('migrations'));
const seederUmzug = new Umzug(migrationConf('seeders'));

/**
 *
 */
const runMigrations = async () => {
  try {
    const migrator = migrationUmzug;
    const migrations = await migrator.up();

    console.log('Migrations up to date', {
      files: migrations.map((file) => file.name),
    });
  } catch (error: unknown) {
    logErrorMessage(error);
    console.log('failed to run migrations: ', error);
  }
};

/**
 *
 */
export const rollbackMigrations = async () => {
  try {
    await sequelize.authenticate();
    const migrator = migrationUmzug;
    await migrator.down();
  } catch (error: unknown) {
    logErrorMessage(error);
    console.log('failed to rollback: ', error);
  }
};

/**
 *
 */
const runSeeder = async () => {
  try {
    const seedData = seederUmzug;
    const seedDataFiles = await seedData.up();

    console.log('Seeder up to date', {
      files: seedDataFiles.map((file) => file.name),
    });
  } catch (error) {
    logErrorMessage(error);
    console.log('failed to run seeders: ', error);
  }
};

/**
 *
 * @returns
 */
export const connectToDatabase = async () => {
  try {
    await sequelize.authenticate();
    await runMigrations();
    await runSeeder();

    console.log('Database connected');
  } catch (error) {
    error instanceof ConnectionError
      ? logErrorMessage(error.message)
      : logErrorMessage(error);

    console.log('Connecting to database failed: ', error);
    return process.exit(1);
  }

  return null;
};

export type Migration = typeof migrationUmzug._types.migration;
export type Seeder = typeof seederUmzug._types.migration;
