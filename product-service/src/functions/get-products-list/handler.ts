import 'source-map-support/register';

import { middyfy } from '@libs/lambda';
import { productsService } from '@core/products-service';
import { productsListGetterFactory } from './handler-factory';

export const main = middyfy(
    productsListGetterFactory(
        productsService.getProductsList.bind(productsService),
    ),
);
