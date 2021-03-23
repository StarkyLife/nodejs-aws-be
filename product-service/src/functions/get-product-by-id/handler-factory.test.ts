import { Product } from '@core/product-model';
import { ProductByIdGetter } from '@core/products-service-types';
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

function createProductIdGetterMock(productId: string) {
    const TEST_PRODUCT: Product = {
        id: productId,
        title: 'product',
        price: 5,
    };

    return {
        TEST_PRODUCT,
        throwingError: jest.fn(() => { throw new Error(); }),
        returningProduct: jest.fn(() => TEST_PRODUCT),
        returningNull: jest.fn(() => null),
    };
}

describe('Lambda for getting product by id', () => {
    async function testLambda(
        productId: string,
        productByIdGetter: ProductByIdGetter,
        expectedResponse: APIGatewayProxyStructuredResultV2,
    ) {
        const getProductByIdLambda = createLambdaForGettingProductById(productByIdGetter);
        const response = await getProductByIdLambda(
            {
                ...emptyAPIGatewayEvent,
                pathParameters: { productId },
            },
            null,
            null,
        );

        expect(response).toEqual(expectedResponse);
    }

    describe('Given function throwing error', () => {
        it('should return response with statusCode = 500', async () => {
            await testLambda(
                '',
                createProductIdGetterMock('').throwingError,
                { statusCode: 500 },
            );
        });
    });

    describe('Given function returning product', () => {
        it('it should return response with statusCode = 200 and body = product with given id', async () => {
            const testProductId = Math.random().toString();
            const productByIdGetterMock = createProductIdGetterMock(testProductId);

            await testLambda(
                testProductId,
                productByIdGetterMock.returningProduct,
                {
                    statusCode: 200,
                    body: JSON.stringify({ product: productByIdGetterMock.TEST_PRODUCT }),
                },
            );
            expect(productByIdGetterMock.returningProduct).toHaveBeenCalledWith(testProductId);
        });
    });

    describe('Given function returning null', () => {
        it('it should return response with statusCode = 404', async () => {
            await testLambda(
                '',
                createProductIdGetterMock('').returningNull,
                {
                    statusCode: 404,
                    body: 'Product not found',
                },
            );
        });
    });
});
