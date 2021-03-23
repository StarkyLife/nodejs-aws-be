import { Product } from './product-model';

export interface ProductsService {
    getProductsList: () => Product[];
    getProductById: (productId: string) => Product | null;
}

export type ProductsListGetter = ProductsService['getProductsList'];
export type ProductByIdGetter = ProductsService['getProductById'];
