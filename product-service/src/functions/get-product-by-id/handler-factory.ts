import type { APIGatewayProxyHandlerV2 } from 'aws-lambda';
import { CanGetProductById } from '@core/products-service-types';
import { formatJSONResponse } from '@libs/apiGateway';

export function createLambdaForGettingProductById(
    service: CanGetProductById,
): APIGatewayProxyHandlerV2 {
    return async function getProductByIdLambda({ pathParameters }) {
        try {
            const product = service.getProductById(pathParameters.productId);

            if (!product) {
                return { statusCode: 404, body: 'Product not found' };
            }

            return formatJSONResponse({ product });
        } catch (error) {
            return { statusCode: 500 };
        }
    };
}
