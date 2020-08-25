import { CancelToken } from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { getCanceler, makeRequest, stringifyParams } from './request';
import { Mutation, Query, QueryResult, Result, ResultM } from './types';
// import { AuthContext } from 'auth';

export interface QueryConfig {
  skip?: boolean;
  authTokenOverride?: string;
}

export interface MutationConfig {
  authTokenOverride?: string;
}

const defaultConfig: QueryConfig = {
  skip: false,
};

const useInvalidator = (): [boolean, () => void] => {
  const [invalidator, setInvalidator] = useState(true);
  const invalidate = useCallback(() => setInvalidator(x => !x), []);
  return [invalidator, invalidate];
};

const useToken = (override?: string) => {
  // const { token } = useContext(AuthContext);
  return override; // || token;
};

/**
 @typedef generatedPoint
 @type {Object}
 @property {number} x The x coordinate.
 @property {number} y The y coordinate.
 */

/**
 * Performs a query and returns its result and state.
 *
 * @param query Query<T> object, usually obtained from query function.
 * @param config additional configuration of the request, available options:
 * - skip when true request is not performed
 * - authTokenOverride use custom token instead of one provided by AuthContext.
 *
 * @returns
 * - data: contains response data, undefined on error
 * - loading: true when request is in progress
 * - error: contains error response
 * - refetch: function than can be used to refetch data
 * - skipped: true when request was skipped
 *
 * @example
 * const { data: posts, loading } = useQuery(getPosts(userId));
 *
 */
export const useQuery = <T>(
  query: Query<T>,
  config: QueryConfig = {}
): QueryResult<T> => {
  const [invalidator, refetch] = useInvalidator();
  const [result, setResult] = useState<QueryResult<T>>({
    loading: true,
    refetch,
    skipped: false,
  });
  const authToken = useToken(config.authTokenOverride);
  config = { ...defaultConfig, ...config };
  const url = query.url + stringifyParams(query.params);

  useEffect(() => {
    if (config.skip) {
      setResult({ skipped: true, refetch, loading: false });
      return;
    }
    const { cancel, token: cancelToken } = getCanceler();
    performRequest({ url }, setResult, cancelToken, authToken, refetch);
    return cancel;
  }, [url, invalidator, refetch, config.skip, authToken]);

  return result;
};

/**
 * Returns function that can be used to perform mutation request
 * and state of the request.
 *
 * Returned function returns a promise.
 *
 * @param mutationFn function that returns Mutation<T>
 * @param config additional configuration of the request, available options:
 *  - authTokenOverride: use custom token instead of one provided by AuthContext.
 *
 * @example
 * const [create, { error, loading }] = useQuery(createPost);
 * create({title: 'Some post', content: 'Some content'})
 *   .then(({data, error}) => {
 *     if (data) {
 *       console.log('Created post');
 *     } else {
 *       console.log('Error', error);
 *     }
 *   });
 */
export const useMutation = <T extends (...args: any[]) => Mutation<any>>(
  mutationFn: T,
  config: MutationConfig = {}
): [(...args: Parameters<T>) => Promise<ResultM<T>>, ResultM<T>] => {
  const authToken = useToken(config.authTokenOverride);
  return useManualRequest(mutationFn, { authTokenOverride: authToken });
};

/**
 * Very similar to useMutation() hook.
 *
 * It does not use AuthContext and can perform Mutation and Query.
 */
export const useManualRequest = <
  T extends (...args: any[]) => Mutation<any> | Query<any>
>(
  queryOrMutationFn: T,
  config: MutationConfig = {}
): [(...args: Parameters<T>) => Promise<ResultM<T>>, ResultM<T>] => {
  const authToken = useToken(config.authTokenOverride);

  const [result, setResult] = useState<ResultM<T>>({
    loading: false,
  });
  const [{ cancel }, setCanceler] = useState(getCanceler());

  const mutate = useCallback(
    async (...args: Parameters<T>): Promise<ResultM<T>> => {
      cancel();
      const canceler = getCanceler();
      const mutation = queryOrMutationFn(...args);
      setCanceler(canceler);
      return performRequest(mutation, setResult, canceler.token, authToken);
    },
    [queryOrMutationFn, cancel, authToken]
  );

  useEffect(() => cancel, [queryOrMutationFn, cancel]);

  return [mutate, result];
};

const performRequest = async <T>(
  r: Query<T> | Mutation<T>,
  setResult: (x: any) => void,
  cancelToken: CancelToken,
  authToken?: string,
  refetch?: () => void
): Promise<QueryResult<T> | Result<T>> => {
  setResult((r: any) => ({ ...r, loading: true }));
  try {
    const res = await makeRequest(r, {
      cancelToken: cancelToken,
      authToken,
    });
    const result = { data: res, loading: false, refetch: refetch };
    setResult(result);
    return result;
  } catch (error) {
    if (!error.canceled) {
      const result = { error: error, loading: false, refetch: refetch };
      setResult(result);
      return result;
    }
    return { loading: false, error: error, refetch: refetch };
  }
};