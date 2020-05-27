export interface HttpResponseError extends Error {
    httpCode?: number;
}