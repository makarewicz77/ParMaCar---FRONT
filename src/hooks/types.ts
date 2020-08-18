export interface Query<T> {
    url: string;
    params?: any;
  }
  
  export interface Result<T> {
    loading: boolean;
    data?: T;
    error?: any;
  }
  
  export interface QueryResult<T> extends Result<T> {
    refetch: () => void;
    skipped: boolean;
  }
  
  export interface Mutation<T> {
    method: 'POST' | 'PUT' | 'PATCH' | 'DELETE';
    url: string;
    params?: any;
    data?: any;
  }
  
  // Returns type of Mutation which is returned from function T
  export type MutationRT<T extends (...args: any[]) => any> = T extends (
    ...args: any[]
  ) => Mutation<infer D>
    ? D
    : any;
  
  // Returns Result<X> where X is MutationRT<T>
  export type ResultM<T extends (...args: any[]) => any> = Result<MutationRT<T>>;