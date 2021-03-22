import type { AWS } from '@serverless/typescript';

// import hello from '@functions/hello';
import { getProductsListFunction } from '@functions/get-products-list';

const serverlessConfiguration: AWS = {
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
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
    },
    region: 'eu-west-1',
    stage: 'dev'
  },
  // import the function via paths
  functions: {
      // hello,
      getProductsListFunction
  },
};

module.exports = serverlessConfiguration;
