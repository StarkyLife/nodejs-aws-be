import { productsMockList } from './products-mocks';
import { productsService } from './products-service';

describe('Get all products', () => {
    it('should return list of products from mock data', () => {
        expect(productsService.getProductsList())
            .toEqual(productsMockList);
    });
});

describe('Get Product by Id', () => {
    it('should return `null` when product not found', () => {
        expect(productsService.getProductById(null))
            .toBe(null);
    });
    it('should return product with given ID from mock data', () => {
        const productFromMock = productsMockList[0];

        expect(productsService.getProductById(productFromMock.id))
            .toBe(productFromMock);
    });
});
