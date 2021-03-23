import 'source-map-support/register';

import { middyfy } from '@libs/lambda';
import { productsService } from '@core/products-service';
import { createLambdaForGettingProductById } from './handler-factory';

export const main = middyfy(
    createLambdaForGettingProductById(
        productsService.getProductById.bind(productsService),
    ),
);
