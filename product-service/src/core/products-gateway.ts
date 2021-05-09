import { Product } from './product-model';

export interface CanGetProductsList {
    getProductsList: () => Promise<Product[]>;
}
export interface CanGetProductById {
    getProductById: (productId: string) => Promise<Product | null>;
}

export interface ProductsGateway extends CanGetProductsList, CanGetProductById { }
