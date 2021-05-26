import { Product, ProductWithoutId } from '@core/product-model';
import { CanCreateProduct } from '@core/products-gateway';
import { CORS_HEADERS } from '@libs/cors-headers';
import { EMPTY_API_GATEWAY_EVENT } from '@libs/doubles/api-gateway-mocks';
import { APIGatewayProxyStructuredResultV2 } from 'aws-lambda';
import { createProductLambdaFactory } from './handler';

async function testLambda(
    newProduct: ProductWithoutId,
    productCreator: CanCreateProduct['createProduct'],
    expectedResponse: APIGatewayProxyStructuredResultV2,
) {
    const createProductLambda = createProductLambdaFactory({ createProduct: productCreator });
    const actualResponse = await createProductLambda(
        {
            ...EMPTY_API_GATEWAY_EVENT,
            body: newProduct,
        },
        null,
        null,
    );

    expect(actualResponse).toEqual({
        ...expectedResponse,
        headers: CORS_HEADERS,
    });
}

describe('Given function that throws an error', () => {
    const THROWEN_ERROR = new Error('error on products create');

    it('should return response with status code = 500', async () => {
        await testLambda(
            null,
            jest.fn(() => Promise.reject(THROWEN_ERROR)),
            {
                statusCode: 500,
                body: THROWEN_ERROR.stack,
            },
        );
    });
});

it('should return newly created product with ID', async () => {
    const NEW_PRODUCT: ProductWithoutId = {
        title: 'title',
        price: 5,
    };
    const CREATED_PRODUCT: Product = {
        ...NEW_PRODUCT,
        id: 'id',
    };

    const successfulProductCreator = jest.fn(() => Promise.resolve(CREATED_PRODUCT));

    await testLambda(
        NEW_PRODUCT,
        successfulProductCreator,
        {
            statusCode: 200,
            body: JSON.stringify(CREATED_PRODUCT),
        },
    );

    expect(successfulProductCreator).toHaveBeenCalledWith(NEW_PRODUCT);
});

// it('should response with 400 given invalid product data', () => { });
