import { inMemoryProductsGateway } from './in-memory-products-gateway';
import { productsMockList } from './products-mocks';

describe('Get all products', () => {
    it('should return list of products from mock data', async () => {
        await expect(inMemoryProductsGateway.getProductsList())
            .resolves
            .toEqual(productsMockList);
    });
});

describe('Get Product by Id', () => {
    it('should return `null` when product not found', async () => {
        expect(inMemoryProductsGateway.getProductById(null))
            .resolves
            .toBe(null);
    });
    it('should return product with given ID from mock data', async () => {
        const productFromMock = productsMockList[0];

        expect(inMemoryProductsGateway.getProductById(productFromMock.id))
            .resolves
            .toBe(productFromMock);
    });
});
