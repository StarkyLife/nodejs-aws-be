import { Product } from '@core/product-model';
import { CanGetProductById } from '@core/products-gateway';
import { CORS_HEADERS } from '@libs/cors-headers';
import { APIGatewayProxyEventV2, APIGatewayProxyStructuredResultV2 } from 'aws-lambda';
import { createLambdaForGettingProductById } from './handler-factory';

const emptyAPIGatewayEvent: APIGatewayProxyEventV2 = {
    version: '',
    routeKey: '',
    rawPath: '',
    rawQueryString: '',
    headers: null,
    requestContext: null,
    pathParameters: null,
    isBase64Encoded: false,
};

function createProductsServiceMock(productId: string) {
    const TEST_PRODUCT: Product = {
        id: productId,
        title: 'product',
        price: 5,
    };

    return {
        TEST_PRODUCT,
        throwingError: {
            getProductById: jest.fn(() => Promise.reject(new Error())),
        } as CanGetProductById,
        returningProduct: {
            getProductById: jest.fn(() => Promise.resolve(TEST_PRODUCT)),
        } as CanGetProductById,
        returningNull: {
            getProductById: jest.fn(() => Promise.resolve(null)),
        } as CanGetProductById,
    };
}

describe('Lambda for getting product by id', () => {
    async function testLambda(
        productId: string,
        productsService: CanGetProductById,
        expectedResponse: APIGatewayProxyStructuredResultV2,
    ) {
        const getProductByIdLambda = createLambdaForGettingProductById(productsService);
        const response = await getProductByIdLambda(
            {
                ...emptyAPIGatewayEvent,
                pathParameters: { productId },
            },
            null,
            null,
        );

        expect(response).toEqual({
            ...expectedResponse,
            headers: CORS_HEADERS,
        });
    }

    describe('Given function throwing error', () => {
        it('should return response with statusCode = 500', async () => {
            await testLambda(
                '',
                createProductsServiceMock('').throwingError,
                { statusCode: 500 },
            );
        });
    });

    describe('Given function returning product', () => {
        it('it should return response with statusCode = 200 and body = product with given id', async () => {
            const testProductId = Math.random().toString();
            const productByIdGetterMock = createProductsServiceMock(testProductId);

            await testLambda(
                testProductId,
                productByIdGetterMock.returningProduct,
                {
                    statusCode: 200,
                    body: JSON.stringify(productByIdGetterMock.TEST_PRODUCT),
                },
            );
            expect(productByIdGetterMock.returningProduct.getProductById).toHaveBeenCalledWith(testProductId);
        });
    });

    describe('Given function returning null', () => {
        it('it should return response with statusCode = 404', async () => {
            await testLambda(
                '',
                createProductsServiceMock('').returningNull,
                {
                    statusCode: 404,
                    body: 'Product not found',
                },
            );
        });
    });
});
