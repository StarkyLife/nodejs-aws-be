import 'source-map-support/register';

import { middyfy } from '@libs/lambda';
import { PostgresProductsGateway } from '@core/postgres-products-gateway';
import { createGetProductsListLambda } from './handler-factory';

const {
    DB_HOST,
    DB_PORT,
    DB_NAME,
    DB_USERNAME,
    DB_PASSWORD,
} = process.env;

export const main = middyfy(createGetProductsListLambda(new PostgresProductsGateway({
    host: DB_HOST,
    port: +DB_PORT,
    database: DB_NAME,
    user: DB_USERNAME,
    password: DB_PASSWORD,
})));
