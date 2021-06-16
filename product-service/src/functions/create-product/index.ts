import { handlerPath } from '@libs/handlerResolver';
import type { AWS } from '@serverless/typescript';
import schema from './schema';

export const createProductAWSFunction: AWS['functions'][0] = {
    handler: `${handlerPath(__dirname)}/handler.main`,
    events: [{
        http: {
            method: 'post',
            path: 'products',
            cors: true,
            request: {
                schemas: {
                    'application/json': schema,
                },
            },
        },
    }],
};
