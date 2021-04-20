import 'source-map-support/register';

import { middyfy } from '@libs/lambda';
import { productsService } from '@core/products-service';
import { createGetProductsListLambda } from './handler-factory';

export const main = middyfy(createGetProductsListLambda(productsService));
