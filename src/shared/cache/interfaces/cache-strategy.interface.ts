
export interface ICacheStrategy {
  get<T>(key: string): Promise<T | T[] | undefined>;
  set<T>(key: string, value: T | T[], ttl?: number): Promise<void>;
  del(key: string): Promise<void>;
  reset(): Promise<void>;
  deleteByPattern(pattern: string): Promise<void>;
}