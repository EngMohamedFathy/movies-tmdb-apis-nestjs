import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { ICacheStrategy } from '../interfaces/cache-strategy.interface';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

@Injectable()
export class RedisCacheStrategy implements ICacheStrategy {
  @Inject(CACHE_MANAGER) private readonly cacheManager: Cache

  async get<T>(key: string): Promise< T | T[] | any | undefined> {
    console.log(key);
    return this.cacheManager.get(key);
  }

  async set<T>(key: string, value: T | T[] | any , ttl?: number): Promise<void> {
    await this.cacheManager.set(key, value, ttl);
  }

  async del(key: string): Promise<void> {
    await this.cacheManager.del(key);
  }

  async reset(): Promise<void> {
    const client = (this.cacheManager.stores as any).getClient();
    await client.flushdb();
  }

  async deleteByPattern(pattern: string): Promise<void> {
    const redisStore = (this.cacheManager.stores as any);

    // logic
  }
}