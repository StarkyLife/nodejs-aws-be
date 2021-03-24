import { handlerPath } from '@libs/handlerResolver';
import type { AWS } from '@serverless/typescript';

export const getProductsListAWSFunction: AWS['functions'][0] = {
    handler: `${handlerPath(__dirname)}/handler.main`,
    events: [{
        http: {
            method: 'get',
            path: 'products',
            cors: true,
        },
    }],
};
