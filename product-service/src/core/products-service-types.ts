import { Product } from "./product-model";

export interface ProductsService {
    getProductsList: () => Product[];
}

export type ProductsListGetter = ProductsService['getProductsList'];
