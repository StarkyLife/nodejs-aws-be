import { inMemoryProductsGateway } from './in-memory-products-gateway';
import { productsMockList } from './products-mocks';

describe('Get all products', () => {
    it('should return list of products from mock data', () => {
        expect(inMemoryProductsGateway.getProductsList())
            .toEqual(productsMockList);
    });
});

describe('Get Product by Id', () => {
    it('should return `null` when product not found', () => {
        expect(inMemoryProductsGateway.getProductById(null))
            .toBe(null);
    });
    it('should return product with given ID from mock data', () => {
        const productFromMock = productsMockList[0];

        expect(inMemoryProductsGateway.getProductById(productFromMock.id))
            .toBe(productFromMock);
    });
});
