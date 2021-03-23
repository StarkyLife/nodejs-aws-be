import { handlerPath } from '@libs/handlerResolver';
import type { AWS } from '@serverless/typescript';

export const getProductById: AWS['functions'][0] = {
    handler: `${handlerPath(__dirname)}/handler.main`,
    events: [],
};
