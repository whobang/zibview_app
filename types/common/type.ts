export enum ChronoUnit {
  SECONDS = "SECONDS",
  MINUTES = "MINUTES",
  HOURS = "HOURS",
  DAYS = "DAYS",
  WEEKS = "WEEKS",
  MONTHS = "MONTHS",
  YEARS = "YEARS",
  // 필요에 따라 추가
}

export interface Page<T> {
  content: T[];
  pageable: Pageable;
  totalPages: number;
  totalElements: number;
  last: boolean;
  first: boolean;
  empty: boolean;
}

interface Pageable {
  sort: Sort;
  offset: number;
  pageNumber: number;
  pageSize: number;
  paged: boolean;
  unpaged: boolean;
}

interface Sort {
  sorted: boolean;
  unsorted: boolean;
  empty: boolean;
}