import knex from 'knex';
import knexConfig from '../knexfile';

// Get the config for the current environment
const environment = process.env.NODE_ENV || 'development';
const config = knexConfig[environment] || knexConfig.development;

// Initialize Knex
export const db = knex(config);

export const runMigrations = async (retries = 10) => {
    while (retries > 0) {
        try {
            console.log('Running migrations...');
            await db.migrate.latest();
            console.log('Migrations completed successfully.');
            return;
        } catch (error) {
            console.error('Migration failed:', error);
            retries -= 1;
            console.log(`Retrying in 5 seconds... (${retries} retries left)`);
            await new Promise(res => setTimeout(res, 5000));
        }
    }
    console.error('Migration failed after multiple attempts.');
    process.exit(1);
};
