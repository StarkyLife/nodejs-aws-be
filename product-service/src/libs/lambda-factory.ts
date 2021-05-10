import { APIGatewayProxyResultV2, Context } from 'aws-lambda';
import { createLambdaResponse, ValidatedAPIGatewayProxyEvent, ValidatedEventAPIGatewayProxyHandler } from './apiGateway';

type CustomLambdaHandler<S> = (
    event: ValidatedAPIGatewayProxyEvent<S>,
    context: Context,
) => Promise<APIGatewayProxyResultV2>;

export function createLambda<Schema>(
    handler: CustomLambdaHandler<Schema>,
): ValidatedEventAPIGatewayProxyHandler<Schema> {
    return async function lambda(event, context) {
        console.log(event);
        try {
            const response = await handler(event, context);

            return response;
        } catch (error) {
            return createLambdaResponse.default(500, error.stack);
        }
    };
}
