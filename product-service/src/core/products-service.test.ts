import { productsMockList } from './products-mocks';
import { productsService } from './products-service';

describe('Get all products', () => {
    it('should return list of products from mock', () => {
        expect(productsService.getProductsList())
            .toEqual(productsMockList);
    });
});
