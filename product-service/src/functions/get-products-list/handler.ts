import 'source-map-support/register';

import { middyfy } from '@libs/lambda';
import { inMemoryProductsGateway } from '@core/in-memory-products-gateway';
import { createGetProductsListLambda } from './handler-factory';

export const main = middyfy(createGetProductsListLambda(inMemoryProductsGateway));
