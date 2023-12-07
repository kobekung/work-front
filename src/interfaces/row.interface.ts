export interface IRowReturn<T> {
  currentPage: number;
  totalPages: number;
  totalCount: number;
  data: T[];
}

export interface IPagination {
  page: number;
  size: number;
}
