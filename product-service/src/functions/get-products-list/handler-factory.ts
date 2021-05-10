import type { APIGatewayProxyHandlerV2 } from 'aws-lambda';
import { createLambdaResponse } from '@libs/apiGateway';
import { CanGetProductsList } from '@core/products-gateway';

export function createGetProductsListLambda(
    service: CanGetProductsList,
): APIGatewayProxyHandlerV2 {
    return async function getProductsListLambda() {
        try {
            const products = await service.getProductsList();

            return createLambdaResponse.json(200, products);
        } catch (error) {
            return createLambdaResponse.default(500, error.message);
        }
    };
}
