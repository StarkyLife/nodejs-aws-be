import { Client } from 'pg';
import { Product } from './product-model';
import { ProductsGateway } from './products-gateway';

export type PostgresDBConnection = {
    host: string;
    port: number;
    database: string;
    user: string;
    password: string;
};

export class PostgresProductsGateway implements ProductsGateway {
    constructor(private dbInfo: PostgresDBConnection) {}

    async getProductsList() {
        const products = await this.makeQuery<Product>('select id, count, title, description, price from stocks s left join products p on p.id = s.product_id');

        return products;
    }

    async getProductById(productId: string) {
        const products = await this.getProductsList();

        return products.find((p) => p.id === productId) ?? null;
    }

    private async makeQuery<ResultRow>(query: string) {
        const client = new Client({
            ...this.dbInfo,
            ssl: {
                rejectUnauthorized: false, // to avoid warring in this example
            },
            connectionTimeoutMillis: 5000, // time in millisecond for termination of the database query
        });

        await client.connect();

        try {
            const queryResult = await client.query<ResultRow>(query);

            client.end();

            return queryResult.rows;
        } catch (e) {
            client.end();
            throw e;
        }
    }
}
