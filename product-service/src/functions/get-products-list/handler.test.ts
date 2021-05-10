import { CanGetProductsList } from '@core/products-gateway';
import { CORS_HEADERS } from '@libs/cors-headers';
import { TEST_PRODUCTS } from '@libs/doubles/products-mocks';
import { APIGatewayProxyStructuredResultV2 } from 'aws-lambda';
import { createGetProductsListLambda } from './handler';

describe('Lambda for getting products list', () => {
    async function testLambda(
        productsGateway: CanGetProductsList,
        expectedResponse: APIGatewayProxyStructuredResultV2,
    ) {
        const getProductsList = createGetProductsListLambda(productsGateway);
        const actualResponse = await getProductsList(null, null, null);

        expect(actualResponse).toEqual({
            ...expectedResponse,
            headers: CORS_HEADERS,
        });
    }

    describe('Given function that returns array of products', () => {
        let productsGatewayMockReturningProducts: CanGetProductsList;

        beforeEach(() => {
            productsGatewayMockReturningProducts = {
                getProductsList: jest.fn(() => Promise.resolve(TEST_PRODUCTS)),
            };
        });

        it('should return response with status code = 200 and body = products list', async () => {
            const stringifiedProductsListResponse = JSON.stringify(TEST_PRODUCTS);

            await testLambda(productsGatewayMockReturningProducts, {
                statusCode: 200,
                body: stringifiedProductsListResponse,
            });
        });
    });
    describe('Given function that throws an error', () => {
        const THROWEN_ERROR = new Error('error on products get');
        let productsGatewayMockThrowingError: CanGetProductsList;

        beforeEach(() => {
            productsGatewayMockThrowingError = {
                getProductsList: jest.fn(() => Promise.reject(THROWEN_ERROR)),
            };
        });

        it('should return response with status code = 500', async () => {
            await testLambda(productsGatewayMockThrowingError, {
                statusCode: 500,
                body: THROWEN_ERROR.stack,
            });
        });
    });
});
