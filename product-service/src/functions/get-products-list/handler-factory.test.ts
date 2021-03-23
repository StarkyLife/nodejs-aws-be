import { Product } from '@core/product-model';
import { ProductsListGetter } from '@core/products-service-types';
import { APIGatewayProxyStructuredResultV2 } from 'aws-lambda';
import { productsListGetterFactory } from './handler-factory';

describe('Lambda for getting products list', () => {
    async function testLambda(
        productsGetter: ProductsListGetter,
        expectedResponse: APIGatewayProxyStructuredResultV2,
    ) {
        const getProductsList = productsListGetterFactory(productsGetter);
        const actualResponse = await getProductsList(null, null, null);

        expect(actualResponse).toEqual(expectedResponse);
    }

    describe('Given function that returns array of products', () => {
        let testProductsList: Product[];
        let productsGetterStubReturningProducts: ProductsListGetter;

        beforeEach(() => {
            testProductsList = [{ id: '1', title: 'product 1', price: 5 }];
            productsGetterStubReturningProducts = jest.fn(() => testProductsList);
        });

        it('should return response with status code = 200 and body = products list', async () => {
            const stringifiedProductsListResponse = JSON.stringify({
                products: testProductsList,
            });

            await testLambda(productsGetterStubReturningProducts, {
                statusCode: 200,
                body: stringifiedProductsListResponse,
            });
        });
    });
    describe('Given function that throws an error', () => {
        let productsGetterStubThrowingError: ProductsListGetter;

        beforeEach(() => {
            productsGetterStubThrowingError = jest.fn(() => { throw new Error(); });
        });

        it('should return response with status code = 500', async () => {
            await testLambda(productsGetterStubThrowingError, {
                statusCode: 500,
            });
        });
    });
});
