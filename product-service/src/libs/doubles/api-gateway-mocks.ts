import { APIGatewayProxyEventV2 } from 'aws-lambda';

export const EMPTY_API_GATEWAY_EVENT: APIGatewayProxyEventV2 = {
    version: '',
    routeKey: '',
    rawPath: '',
    rawQueryString: '',
    headers: null,
    requestContext: null,
    pathParameters: null,
    isBase64Encoded: false,
};
