
import { Injectable } from '@nestjs/common';
import { ICacheStrategy } from '../interfaces/cache-strategy.interface';

@Injectable()
export class NoCacheStrategy implements ICacheStrategy {
  async get<T>(key: string): Promise<T | undefined> {
    return undefined;
  }

  async set<T>(key: string, value: T, ttl?: number): Promise<void> {
    // Do nothing
  }

  async del(key: string): Promise<void> {
    // Do nothing
  }

  async reset(): Promise<void> {
    // Do nothing
  }

  async deleteByPattern(pattern: string): Promise<void> {
    // Do nothing
  }
}