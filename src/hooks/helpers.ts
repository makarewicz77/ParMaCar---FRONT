import { Mutation, Query } from './types';

export interface Paginated<T> {
  count: number;
  results: Array<T>;
}
export type IdType = number | string;
 
export type PartialWithId<T> = Partial<T> & { id: IdType };

export interface CRUD<T, P = any> {
  get: (id: IdType) => Query<T>;
  getAll: (params?: P) => Query<Array<T>>;
  getAllPaginated: (
    params?: P & { limit?: number; offset?: number }
  ) => Query<Paginated<T>>;
  create: (obj: Partial<T>) => Mutation<T>;
  update: (obj: PartialWithId<T>) => Mutation<T>;
  updateOrCreate: (obj: Partial<T>, create?: boolean) => Mutation<T>;
  delete: (id: IdType) => Mutation<void>;
}

/**
 * Create baseUrl/id/ from baseUrl and id.
 *
 * @example
 * const url = detailUrl('http://localhost:8000/users/', 5);
 * console.log(url); // http://localhost:8000/users/5/
 */
export const detailUrl = (baseUrl: string, id: IdType): string =>
  `${baseUrl}${id}/`;

/**
 * Create basic set of operations for api resource:
 * - get: GET /resources/id
 * - getAll: GET /resources, supports parameters
 * - create: POST /resources
 * - update: PUT /resources/id
 * - delete: DELETE /resources/id
 *
 * @example
 * const usersApi = {
 *   ...crud('http://localhost:8000/users')
 * }
 * // Somewhere in the component
 * const {data: user} = useQuery(usersApi.getUser(id));
 */
export const crud = <T extends { id: IdType }, P = any>(
  baseUrl: string,
  customSerializers: Partial<Record<keyof P, (x: any) => any>> = {}
): CRUD<T, P> => ({
  get: (id: IdType): Query<T> => ({
    url: detailUrl(baseUrl, id),
  }),
  getAll: (params?: P): Query<Array<T>> => ({
    url: baseUrl,
    params: serializeParams(params, customSerializers),
  }),
  getAllPaginated: (params?: P): Query<Paginated<T>> => ({
    url: baseUrl,
    params: serializeParams(params, customSerializers),
  }),
  create: (obj: Partial<T>): Mutation<T> => ({
    url: baseUrl,
    method: 'POST',
    data: obj,
  }),
  update: (obj: PartialWithId<T>): Mutation<T> => ({
    url: detailUrl(baseUrl, obj.id),
    method: 'PUT',
    data: obj,
  }),
  updateOrCreate: (obj: Partial<T>, create?: boolean): Mutation<T> => {
    const shouldCreate = create !== undefined ? create : !obj.id;
    return {
      url: shouldCreate ? baseUrl : detailUrl(baseUrl, obj.id as IdType),
      method: shouldCreate ? 'POST' : 'PUT',
      data: obj,
    };
  },
  delete: (id: IdType): Mutation<void> => ({
    method: 'DELETE',
    url: detailUrl(baseUrl, id),
  }),
});

export const serializeParams = (
  params: any,
  serializers: Partial<Record<string, (x: any) => any>>
) => {
  const obj: any = {};
  Object.keys(params).forEach(
    key => (obj[key] = serializers?.[key]?.(params[key]) ?? params[key])
  );
  return obj;
};
