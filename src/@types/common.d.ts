export interface DataResponseInfinite<T extends any[]> {
  data: T;
  pageKey?: number;
}
