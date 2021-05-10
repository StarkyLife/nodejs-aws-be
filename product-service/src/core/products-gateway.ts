import { Product, ProductWithoutId } from './product-model';

export interface CanGetProductsList {
    getProductsList: () => Promise<Product[]>;
}
export interface CanGetProductById {
    getProductById: (productId: string) => Promise<Product | null>;
}
export interface CanCreateProduct {
    createProduct: (newProduct: ProductWithoutId) => Promise<Product>;
}

export interface ProductsGateway extends CanGetProductsList, CanGetProductById, CanCreateProduct { }
