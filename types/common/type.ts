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
  totalPages: number;
  totalElements: number;
  last: boolean;
  first: boolean;
  empty: boolean;
}