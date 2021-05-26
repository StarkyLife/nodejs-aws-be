import { Client } from 'pg';
import { Product, ProductOnlyWithId, ProductWithoutId } from './product-model';
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

    async createProduct({
        title, description, price, count,
    }: ProductWithoutId) {
        const createdProductId = await this.makeTransaction(async (client) => {
            const createdProducts = (
                await client.query<ProductOnlyWithId>(`
                    insert into products (title, description, price) values
                    ('${title}', '${description ?? ''}', ${price})
                    returning id;
                `)
            ).rows;

            const productId = createdProducts[0].id;

            await client.query(`
                insert into stocks (product_id, count) values
                ('${productId}', ${count ?? 0});
            `);

            return productId;
        });

        return this.getProductById(createdProductId);
    }

    private async getConnectedClient() {
        const client = new Client({
            ...this.dbInfo,
            ssl: {
                rejectUnauthorized: false, // to avoid warring in this example
            },
            connectionTimeoutMillis: 5000, // time in millisecond for termination of the database query
        });

        await client.connect();

        return client;
    }

    private async makeQuery<ResultRow>(query: string) {
        const client = await this.getConnectedClient();

        try {
            const queryResult = await client.query<ResultRow>(query);

            return queryResult.rows;
        } finally {
            client.end();
        }
    }

    private async makeTransaction<Result>(
        transactionQueriesHandler: (connectedClient: Client) => Promise<Result>,
    ) {
        const client = await this.getConnectedClient();

        try {
            await client.query('BEGIN');

            const result = await transactionQueriesHandler(client);

            await client.query('COMMIT');

            return result;
        } catch (e) {
            await client.query('ROLLBACK');
            throw e;
        } finally {
            client.end();
        }
    }
}
