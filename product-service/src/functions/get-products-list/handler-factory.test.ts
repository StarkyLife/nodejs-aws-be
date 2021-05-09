import { Product } from '@core/product-model';
import { CanGetProductsList } from '@core/products-gateway';
import { CORS_HEADERS } from '@libs/cors-headers';
import { APIGatewayProxyStructuredResultV2 } from 'aws-lambda';
import { createGetProductsListLambda } from './handler-factory';

const TEST_PRODUCTS_LIST: Product[] = [{ id: '1', title: 'product 1', price: 5 }];

describe('Lambda for getting products list', () => {
    async function testLambda(
        productsService: CanGetProductsList,
        expectedResponse: APIGatewayProxyStructuredResultV2,
    ) {
        const getProductsList = createGetProductsListLambda(productsService);
        const actualResponse = await getProductsList(null, null, null);

        expect(actualResponse).toEqual({
            ...expectedResponse,
            headers: CORS_HEADERS,
        });
    }

    describe('Given function that returns array of products', () => {
        let productsServiceMockReturningProducts: CanGetProductsList;

        beforeEach(() => {
            productsServiceMockReturningProducts = {
                getProductsList: jest.fn(() => Promise.resolve(TEST_PRODUCTS_LIST)),
            };
        });

        it('should return response with status code = 200 and body = products list', async () => {
            const stringifiedProductsListResponse = JSON.stringify(TEST_PRODUCTS_LIST);

            await testLambda(productsServiceMockReturningProducts, {
                statusCode: 200,
                body: stringifiedProductsListResponse,
            });
        });
    });
    describe('Given function that throws an error', () => {
        let productsServiceMockThrowingError: CanGetProductsList;

        beforeEach(() => {
            productsServiceMockThrowingError = {
                getProductsList: jest.fn(() => Promise.reject(new Error())),
            };
        });

        it('should return response with status code = 500', async () => {
            await testLambda(productsServiceMockThrowingError, {
                statusCode: 500,
            });
        });
    });
});
