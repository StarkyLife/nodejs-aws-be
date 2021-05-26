import { ProductWithoutId } from '@core/product-model';
import axios from 'axios';

const URL = 'https://dquwkhdp49.execute-api.eu-west-1.amazonaws.com/dev/products';

it.skip('should work', async () => {
    await expect(
        axios.post(URL, {
            title: 'transaction test',
            price: 50,
            count: 2,
            description: 'is it worked?',
        } as ProductWithoutId),
    ).resolves.toEqual(
        expect.objectContaining({
            status: 200,
        }),
    );
});
