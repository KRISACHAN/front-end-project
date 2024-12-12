import createError from 'http-errors';
import httpStatus from 'http-status';

export const BAD_REQUEST = (message = 'BAD_REQUEST') =>
    createError(httpStatus.BAD_REQUEST, message);

export const UNAUTHORIZED = (message = 'UNAUTHORIZED') =>
    createError(httpStatus.UNAUTHORIZED, message);

export const PAYMENT_REQUIRED = (message = 'PAYMENT_REQUIRED') =>
    createError(httpStatus.PAYMENT_REQUIRED, message);

export const FORBIDDEN = (message = 'FORBIDDEN') =>
    createError(httpStatus.FORBIDDEN, message);

export const NOT_FOUND = (message = 'NOT_FOUND') =>
    createError(httpStatus.NOT_FOUND, message);

export const METHOD_NOT_ALLOWED = (message = 'METHOD_NOT_ALLOWED') =>
    createError(httpStatus.METHOD_NOT_ALLOWED, message);

export const NOT_ACCEPTABLE = (message = 'NOT_ACCEPTABLE') =>
    createError(httpStatus.NOT_ACCEPTABLE, message);

export const PROXY_AUTHENTICATION_REQUIRED = (
    message = 'PROXY_AUTHENTICATION_REQUIRED',
) => createError(httpStatus.PROXY_AUTHENTICATION_REQUIRED, message);

export const REQUEST_TIMEOUT = (message = 'REQUEST_TIMEOUT') =>
    createError(httpStatus.REQUEST_TIMEOUT, message);

export const CONFLICT = (message = 'CONFLICT') =>
    createError(httpStatus.CONFLICT, message);

export const GONE = (message = 'GONE') => createError(httpStatus.GONE, message);

export const LENGTH_REQUIRED = (message = 'LENGTH_REQUIRED') =>
    createError(httpStatus.LENGTH_REQUIRED, message);

export const PRECONDITION_FAILED = (message = 'PRECONDITION_FAILED') =>
    createError(httpStatus.PRECONDITION_FAILED, message);

export const REQUEST_ENTITY_TOO_LARGE = (
    message = 'REQUEST_ENTITY_TOO_LARGE',
) => createError(httpStatus.REQUEST_ENTITY_TOO_LARGE, message);

export const REQUEST_URI_TOO_LONG = (message = 'REQUEST_URI_TOO_LONG') =>
    createError(httpStatus.REQUEST_URI_TOO_LONG, message);

export const UNSUPPORTED_MEDIA_TYPE = (message = 'UNSUPPORTED_MEDIA_TYPE') =>
    createError(httpStatus.UNSUPPORTED_MEDIA_TYPE, message);
export const REQUESTED_RANGE_NOT_SATISFIABLE = (
    message = 'REQUESTED_RANGE_NOT_SATISFIABLE',
) => createError(httpStatus.REQUESTED_RANGE_NOT_SATISFIABLE, message);
export const EXPECTATION_FAILED = (message = 'EXPECTATION_FAILED') =>
    createError(httpStatus.EXPECTATION_FAILED, message);
export const IM_A_TEAPOT = (message = 'IM_A_TEAPOT') =>
    createError(httpStatus.IM_A_TEAPOT, message);

export const MISDIRECTED_REQUEST = (message = 'MISDIRECTED_REQUEST') =>
    createError(httpStatus.MISDIRECTED_REQUEST, message);

export const UNPROCESSABLE_ENTITY = (message = 'UNPROCESSABLE_ENTITY') =>
    createError(httpStatus.UNPROCESSABLE_ENTITY, message);

export const LOCKED = (message = 'LOCKED') =>
    createError(httpStatus.LOCKED, message);

export const FAILED_DEPENDENCY = (message = 'FAILED_DEPENDENCY') =>
    createError(httpStatus.FAILED_DEPENDENCY, message);

export const UPGRADE_REQUIRED = (message = 'UPGRADE_REQUIRED') =>
    createError(httpStatus.UPGRADE_REQUIRED, message);

export const PRECONDITION_REQUIRED = (message = 'PRECONDITION_REQUIRED') =>
    createError(httpStatus.PRECONDITION_REQUIRED, message);

export const TOO_MANY_REQUESTS = (message = 'TOO_MANY_REQUESTS') =>
    createError(httpStatus.TOO_MANY_REQUESTS, message);

export const REQUEST_HEADER_FIELDS_TOO_LARGE = (
    message = 'REQUEST_HEADER_FIELDS_TOO_LARGE',
) => createError(httpStatus.REQUEST_HEADER_FIELDS_TOO_LARGE, message);

export const UNAVAILABLE_FOR_LEGAL_REASONS = (
    message = 'UNAVAILABLE_FOR_LEGAL_REASONS',
) => createError(httpStatus.UNAVAILABLE_FOR_LEGAL_REASONS, message);

export const INTERNAL_SERVER_ERROR = (message = 'INTERNAL_SERVER_ERROR') =>
    createError(httpStatus.INTERNAL_SERVER_ERROR, message);

export const NOT_IMPLEMENTED = (message = 'NOT_IMPLEMENTED') =>
    createError(httpStatus.NOT_IMPLEMENTED, message);

export const BAD_GATEWAY = (message = 'BAD_GATEWAY') =>
    createError(httpStatus.BAD_GATEWAY, message);

export const SERVICE_UNAVAILABLE = (message = 'SERVICE_UNAVAILABLE') =>
    createError(httpStatus.SERVICE_UNAVAILABLE, message);

export const GATEWAY_TIMEOUT = (message = 'GATEWAY_TIMEOUT') =>
    createError(httpStatus.GATEWAY_TIMEOUT, message);

export const HTTP_VERSION_NOT_SUPPORTED = (
    message = 'HTTP_VERSION_NOT_SUPPORTED',
) => createError(httpStatus.HTTP_VERSION_NOT_SUPPORTED, message);

export const VARIANT_ALSO_NEGOTIATES = (message = 'VARIANT_ALSO_NEGOTIATES') =>
    createError(httpStatus.VARIANT_ALSO_NEGOTIATES, message);

export const INSUFFICIENT_STORAGE = (message = 'INSUFFICIENT_STORAGE') =>
    createError(httpStatus.INSUFFICIENT_STORAGE, message);

export const LOOP_DETECTED = (message = 'LOOP_DETECTED') =>
    createError(httpStatus.LOOP_DETECTED, message);

export const NOT_EXTENDED = (message = 'NOT_EXTENDED') =>
    createError(httpStatus.NOT_EXTENDED, message);

export const NETWORK_AUTHENTICATION_REQUIRED = (
    message = 'NETWORK_AUTHENTICATION_REQUIRED',
) => createError(httpStatus.NETWORK_AUTHENTICATION_REQUIRED, message);
