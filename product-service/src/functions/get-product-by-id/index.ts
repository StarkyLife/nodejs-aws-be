import { handlerPath } from '@libs/handlerResolver';
import type { AWS } from '@serverless/typescript';

export const getProductByIdAWSFunction: AWS['functions'][0] = {
    handler: `${handlerPath(__dirname)}/handler.main`,
    events: [{
        http: {
            method: 'get',
            path: 'products/{productId}',
            cors: true,
            request: {
                parameters: {
                    paths: { productId: true },
                },
            },
        },
    }],
};
