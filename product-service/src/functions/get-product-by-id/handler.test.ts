import { Product } from '@core/product-model';
import { CanGetProductById } from '@core/products-gateway';
import { CORS_HEADERS } from '@libs/cors-headers';
import { EMPTY_API_GATEWAY_EVENT } from '@libs/doubles/api-gateway-mocks';
import { APIGatewayProxyStructuredResultV2 } from 'aws-lambda';
import { createLambdaForGettingProductById } from './handler';

function createProductsServiceMock(productId: string) {
    const TEST_PRODUCT: Product = {
        id: productId,
        title: 'product',
        price: 5,
    };

    const THROWEN_ERROR = new Error('error on get by product Id');

    return {
        TEST_PRODUCT,
        THROWEN_ERROR,
        throwingError: {
            getProductById: jest.fn(() => Promise.reject(THROWEN_ERROR)),
        } as CanGetProductById,
        returningProduct: {
            getProductById: jest.fn(() => Promise.resolve(TEST_PRODUCT)),
        } as CanGetProductById,
        returningNull: {
            getProductById: jest.fn(() => Promise.resolve(null)),
        } as CanGetProductById,
    };
}

async function testLambda(
    productId: string,
    productsService: CanGetProductById,
    expectedResponse: APIGatewayProxyStructuredResultV2,
) {
    const getProductByIdLambda = createLambdaForGettingProductById(productsService);
    const response = await getProductByIdLambda(
        {
            ...EMPTY_API_GATEWAY_EVENT,
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
        const productByIdGetterMock = createProductsServiceMock('');

        await testLambda(
            '',
            productByIdGetterMock.throwingError,
            {
                statusCode: 500,
                body: productByIdGetterMock.THROWEN_ERROR.stack,
            },
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
