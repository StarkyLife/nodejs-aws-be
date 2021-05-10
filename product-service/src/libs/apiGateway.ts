import type {
    APIGatewayProxyEventV2,
    APIGatewayProxyResultV2,
    Handler,
} from 'aws-lambda';
import type { FromSchema } from 'json-schema-to-ts';
import { CORS_HEADERS } from './cors-headers';

export type ValidatedAPIGatewayProxyEvent<S> = Omit<APIGatewayProxyEventV2, 'body'> & { body?: FromSchema<S> };
export type ValidatedEventAPIGatewayProxyHandler<S> = Handler<ValidatedAPIGatewayProxyEvent<S>, APIGatewayProxyResultV2>;

export const createLambdaResponse = {
    json: (
        statusCode: number,
        response: unknown,
    ): APIGatewayProxyResultV2 => ({
        statusCode,
        body: JSON.stringify(response),
        headers: CORS_HEADERS,
    }),

    default: (
        statusCode: number,
        body?: string,
    ): APIGatewayProxyResultV2 => ({
        statusCode,
        body,
        headers: CORS_HEADERS,
    }),
};
