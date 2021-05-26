import 'source-map-support/register';

import { defaultPostgresConnection } from '@core/default-postgres-connection';
import { PostgresProductsGateway } from '@core/postgres-products-gateway';
import type { CanCreateProduct } from '@core/products-gateway';
import { createLambdaResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import { createLambda } from '@libs/lambda-factory';
import schema from './schema';

export function createProductLambdaFactory(
    gateway: CanCreateProduct,
) {
    return createLambda<typeof schema>(async (event) => {
        const createdProduct = await gateway.createProduct(event.body);

        return createLambdaResponse.json(200, createdProduct);
    });
}

export const main = middyfy(createProductLambdaFactory(
    new PostgresProductsGateway(defaultPostgresConnection),
));
