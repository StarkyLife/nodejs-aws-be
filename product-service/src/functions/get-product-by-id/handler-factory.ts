import type { APIGatewayProxyHandlerV2 } from 'aws-lambda';
import { ProductByIdGetter } from '@core/products-service-types';
import { formatJSONResponse } from '@libs/apiGateway';

export function createLambdaForGettingProductById(
    productByIdGetter: ProductByIdGetter,
): APIGatewayProxyHandlerV2 {
    return async function getProductByIdLambda({ pathParameters }) {
        try {
            const product = productByIdGetter(pathParameters.productId);

            if (!product) {
                return { statusCode: 404, body: 'Product not found' };
            }

            return formatJSONResponse({ product });
        } catch (error) {
            return { statusCode: 500 };
        }
    };
}
