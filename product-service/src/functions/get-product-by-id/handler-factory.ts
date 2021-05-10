import type { APIGatewayProxyHandlerV2 } from 'aws-lambda';
import { CanGetProductById } from '@core/products-gateway';
import { createLambdaResponse } from '@libs/apiGateway';

export function createLambdaForGettingProductById(
    service: CanGetProductById,
): APIGatewayProxyHandlerV2 {
    return async function getProductByIdLambda({ pathParameters }) {
        try {
            const product = await service.getProductById(pathParameters.productId);

            if (!product) {
                return createLambdaResponse.default(404, 'Product not found');
            }

            return createLambdaResponse.json(200, product);
        } catch (error) {
            return createLambdaResponse.default(500, error.message);
        }
    };
}
