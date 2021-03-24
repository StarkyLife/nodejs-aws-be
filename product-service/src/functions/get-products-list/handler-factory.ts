import type { APIGatewayProxyHandlerV2 } from 'aws-lambda';
import { formatJSONResponse } from '@libs/apiGateway';
import { CanGetProductsList } from '@core/products-service-types';

export function createGetProductsListLambda(
    service: CanGetProductsList,
): APIGatewayProxyHandlerV2 {
    return async function getProductsListLambda() {
        try {
            const products = service.getProductsList();

            return formatJSONResponse({ products });
        } catch (error) {
            return { statusCode: 500 };
        }
    };
}
