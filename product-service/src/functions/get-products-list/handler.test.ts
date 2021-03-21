import { getProductsList } from './handler';

describe('Lambda for getting products list', () => {
    it('should return response with status code = 200', () => {
        const response = getProductsList();
        expect(response).toEqual({
            statusCode: 200,
        });
    });
});
