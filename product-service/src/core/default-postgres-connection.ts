import { PostgresDBConnection } from './postgres-products-gateway';

const {
    DB_HOST,
    DB_PORT,
    DB_NAME,
    DB_USERNAME,
    DB_PASSWORD,
} = process.env;

export const defaultPostgresConnection: PostgresDBConnection = {
    host: DB_HOST,
    port: +DB_PORT,
    database: DB_NAME,
    user: DB_USERNAME,
    password: DB_PASSWORD,
};
