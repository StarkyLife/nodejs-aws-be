import 'source-map-support/register';

import { PostgresProductsGateway } from '@core/postgres-products-gateway';
import { defaultPostgresConnection } from '@core/default-postgres-connection';
import type { CanGetProductById } from '@core/products-gateway';
import { createLambdaResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import { createLambda } from '@libs/lambda-factory';

export function createLambdaForGettingProductById(
    service: CanGetProductById,
) {
    return createLambda(async ({ pathParameters }) => {
        const product = await service.getProductById(pathParameters.productId);

        if (!product) {
            return createLambdaResponse.default(404, 'Product not found');
        }

        return createLambdaResponse.json(200, product);
    });
}

export const main = middyfy(createLambdaForGettingProductById(
    new PostgresProductsGateway(defaultPostgresConnection),
));
