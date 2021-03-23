import { productsMockList } from './products-mocks';
import { ProductsService } from './products-service-types';

export const productsService: ProductsService = {
    getProductsList() {
        return productsMockList;
    },
    getProductById(productId) {
        return productsMockList.find((product) => product.id === productId) ?? null;
    },
};
