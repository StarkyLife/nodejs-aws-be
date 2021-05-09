import { productsMockList } from './products-mocks';
import { ProductsGateway } from './products-gateway';

export const inMemoryProductsGateway: ProductsGateway = {
    async getProductsList() {
        return productsMockList;
    },
    async getProductById(productId) {
        return productsMockList.find((product) => product.id === productId) ?? null;
    },
};
