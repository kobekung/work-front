export interface IRowReturn<T> {
  page: number;
  lastPage: number;
  total: number;
  data: T[];
}

export interface IPagination {
  search?: string;
  page: number;
  limit: number;
}
