import { Product } from './product-model';

export interface CanGetProductsList {
    getProductsList: () => Product[];
}
export interface CanGetProductById {
    getProductById: (productId: string) => Product | null;
}

export interface ProductsService extends CanGetProductsList, CanGetProductById { }
