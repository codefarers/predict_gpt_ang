export interface SliceState<T> {
  data?: T,
  loading: boolean;
  hasError: boolean;
}
