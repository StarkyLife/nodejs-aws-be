import type {
    APIGatewayProxyEvent,
    APIGatewayProxyResult,
    APIGatewayProxyResultV2,
    Handler,
} from 'aws-lambda';
import type { FromSchema } from 'json-schema-to-ts';
import { CORS_HEADERS } from './cors-headers';

type ValidatedAPIGatewayProxyEvent<S> = Omit<APIGatewayProxyEvent, 'body'> & { body: FromSchema<S> };
export type ValidatedEventAPIGatewayProxyEvent<S> = Handler<ValidatedAPIGatewayProxyEvent<S>, APIGatewayProxyResult>;

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
