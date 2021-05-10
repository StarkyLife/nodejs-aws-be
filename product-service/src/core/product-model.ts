export interface Product {
    id: string;
    title: string;
    description?: string;
    price: number;
    count?: number;
}

export type ProductWithoutId = Omit<Product, 'id'>;
export type ProductOnlyWithId = Pick<Product, 'id'>;
