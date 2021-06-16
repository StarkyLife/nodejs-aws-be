/* eslint-disable no-template-curly-in-string */
import type { AWS } from '@serverless/typescript';

import { getProductsListAWSFunction } from '@functions/get-products-list';
import { getProductByIdAWSFunction } from '@functions/get-product-by-id';
import { createProductAWSFunction } from '@functions/create-product';

const serverlessConfiguration: AWS = {
    useDotenv: true,
    service: 'product-service',
    frameworkVersion: '2',
    custom: {
        webpack: {
            webpackConfig: './webpack.config.js',
            includeModules: true,
        },
    },
    plugins: ['serverless-webpack'],
    provider: {
        name: 'aws',
        runtime: 'nodejs14.x',
        lambdaHashingVersion: '20201221',
        apiGateway: {
            minimumCompressionSize: 1024,
            shouldStartNameWithService: true,
        },
        region: 'eu-west-1',
        stage: 'dev',
        environment: {
            AWS_NODEJS_CONNECTION_REUSE_ENABLED: '${env:AWS_NODEJS_CONNECTION_REUSE_ENABLED}',
            DB_HOST: '${env:DB_HOST}',
            DB_PORT: '${env:DB_PORT}',
            DB_NAME: '${env:DB_NAME}',
            DB_USERNAME: '${env:DB_USERNAME}',
            DB_PASSWORD: '${env:DB_PASSWORD}',
        },
    },
    functions: {
        getProductsListAWSFunction,
        getProductByIdAWSFunction,
        createProductAWSFunction,
    },
};

module.exports = serverlessConfiguration;
