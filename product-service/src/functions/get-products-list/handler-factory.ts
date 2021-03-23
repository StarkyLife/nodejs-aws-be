import type { APIGatewayProxyHandlerV2 } from 'aws-lambda';
import { formatJSONResponse } from '@libs/apiGateway';
import { ProductsListGetter } from '@core/products-service-types';

export function productsListGetterFactory(
    productsGetter: ProductsListGetter,
): APIGatewayProxyHandlerV2 {
    return async function getProductsListLambda() {
        try {
            const products = productsGetter();

            return formatJSONResponse({ products });
        } catch (error) {
            return { statusCode: 500 };
        }
    };
}
