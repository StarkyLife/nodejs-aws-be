import 'source-map-support/register';

import { middyfy } from '@libs/lambda';
import { PostgresProductsGateway } from '@core/postgres-products-gateway';
import { defaultPostgresConnection } from '@core/default-postgres-connection';
import { createGetProductsListLambda } from './handler-factory';

export const main = middyfy(createGetProductsListLambda(
    new PostgresProductsGateway(defaultPostgresConnection),
));
