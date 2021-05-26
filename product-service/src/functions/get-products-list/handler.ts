import 'source-map-support/register';

import { middyfy } from '@libs/lambda';
import { PostgresProductsGateway } from '@core/postgres-products-gateway';
import { defaultPostgresConnection } from '@core/default-postgres-connection';
import { CanGetProductsList } from '@core/products-gateway';
import { createLambdaResponse } from '@libs/apiGateway';
import { createLambda } from '@libs/lambda-factory';

export function createGetProductsListLambda(
    service: CanGetProductsList,
) {
    return createLambda(async () => {
        const products = await service.getProductsList();

        return createLambdaResponse.json(200, products);
    });
}

export const main = middyfy(createGetProductsListLambda(
    new PostgresProductsGateway(defaultPostgresConnection),
));
