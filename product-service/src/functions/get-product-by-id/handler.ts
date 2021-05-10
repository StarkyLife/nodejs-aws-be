import 'source-map-support/register';

import { middyfy } from '@libs/lambda';
import { PostgresProductsGateway } from '@core/postgres-products-gateway';
import { defaultPostgresConnection } from '@core/default-postgres-connection';
import { createLambdaForGettingProductById } from './handler-factory';

export const main = middyfy(createLambdaForGettingProductById(
    new PostgresProductsGateway(defaultPostgresConnection),
));
