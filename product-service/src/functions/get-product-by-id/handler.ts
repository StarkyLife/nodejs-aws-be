import 'source-map-support/register';

import { middyfy } from '@libs/lambda';
import { inMemoryProductsGateway } from '@core/in-memory-products-gateway';
import { createLambdaForGettingProductById } from './handler-factory';

export const main = middyfy(createLambdaForGettingProductById(inMemoryProductsGateway));
