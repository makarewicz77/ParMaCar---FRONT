import axios, { CancelToken } from 'axios';
import qs from 'qs';
import { Mutation, Query } from './types';

export const getCanceler = axios.CancelToken.source;

export interface RequestOptions {
  cancelToken?: CancelToken;
  authToken?: string;
}

export const makeRequest = <T>(
  r: Query<T> | Mutation<T>,
  options: RequestOptions = {}
): Promise<T> =>
  axios
    .request({
      url: r.url + stringifyParams(r.params),
      method: getMethod(r),
      data: getData(r),
      headers: getHeaders(r, options),
      cancelToken: options.cancelToken,
    })
    .then(res => res.data)
    .catch(handleError);

export const stringifyParams = (params: any) => {
  const str = qs.stringify(params, {
    sort: (a, b) => a.localeCompare(b),
    arrayFormat: 'comma',
  });
  return str ? `?${str}` : '';
};

export const paginationParams = (
  page: number,
  perPage: number,
  filters: any
) => ({
  limit: perPage,
  offset: (page - 1) * perPage,
  ...filters,
});

// Helpers

const getMethod = <T>(r: Query<T> | Mutation<T>) =>
  'method' in r ? r.method : 'GET';

const getData = <T>(r: Query<T> | Mutation<T>) =>
  'data' in r ? JSON.stringify(r.data) : undefined;

const getHeaders = <T>(
  r: Query<T> | Mutation<T>,
  options: RequestOptions = {}
) =>
  filterObj({
    'content-type':
      'data' in r && !(r.data instanceof FormData)
        ? 'application/json'
        : undefined,
    authorization: options.authToken ? `Token ${options.authToken}` : undefined,
  });

const handleError = (error: any) => {
  if (axios.isCancel(error)) {
    error = { canceled: true };
  } else {
    error = error.response || {};
  }
  throw error;
};

const filterObj = (obj: any) => {
  Object.keys(obj).forEach(key => obj[key] === undefined && delete obj[key]);
  return obj;
};
