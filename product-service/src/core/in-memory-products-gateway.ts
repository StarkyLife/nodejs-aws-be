import { productsMockList } from './products-mocks';
import { ProductsGateway } from './products-gateway';

export const inMemoryProductsGateway: ProductsGateway = {
    getProductsList() {
        return productsMockList;
    },
    getProductById(productId) {
        return productsMockList.find((product) => product.id === productId) ?? null;
    },
};
