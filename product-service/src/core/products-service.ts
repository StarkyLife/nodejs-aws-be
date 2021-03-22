import { ProductsService } from "./products-service-types";

export const productsService: ProductsService = {
    getProductsList() {
        return [{ name: 'starkylife\'s product' }];
    }
};
