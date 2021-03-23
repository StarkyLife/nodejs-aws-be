import { handlerPath } from '@libs/handlerResolver';
import type { AWS } from '@serverless/typescript';

export const getProductsListFunction: AWS['functions'][0] = {
    handler: `${handlerPath(__dirname)}/handler.main`,
    events: [],
};
