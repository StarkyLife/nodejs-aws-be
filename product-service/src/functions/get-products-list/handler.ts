import 'source-map-support/register';

import { middyfy } from "@libs/lambda";
import { productsListGetterFactory } from "./handler-factory";
import { productsService } from '@core/products-service';

export const main = middyfy(
    productsListGetterFactory(
        productsService.getProductsList.bind(productsService)
    )
);
