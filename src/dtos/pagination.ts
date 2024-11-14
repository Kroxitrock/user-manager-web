export interface Page<T> {
  content: T[];
  first: boolean;
  last: boolean;
  empty: boolean;
  number: number;
  totalPages: number;
}

export interface PageRequest {
  size: number;
  page: number;
}
