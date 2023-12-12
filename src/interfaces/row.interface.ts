export interface IRowReturn<T> {
  page: number;
  lastPage: number;
  total: number;
  data: T[];
}

export interface IPagination {
  page: number;
  limit: number;
}
