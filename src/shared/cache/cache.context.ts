import { Injectable } from '@nestjs/common';
import { ICacheStrategy } from './interfaces/cache-strategy.interface';

@Injectable()
export class CacheContext {
  private strategy: ICacheStrategy;

  constructor(strategy: ICacheStrategy) {
    this.strategy = strategy;
  }

  setStrategy(strategy: ICacheStrategy) {
    this.strategy = strategy;
  }

  get<T>(key: string): Promise<T | T[] | undefined> {
    return this.strategy.get(key);
  }

  set<T>(key: string, value: T, ttl?: number): Promise<void> {
    return this.strategy.set(key, value, ttl);
  }

  del(key: string): Promise<void> {
    return this.strategy.del(key);
  }

  reset(): Promise<void> {
    return this.strategy.reset();
  }

  deleteByPattern(pattern: string): Promise<void> {
    return this.strategy.deleteByPattern(pattern);
  }
}