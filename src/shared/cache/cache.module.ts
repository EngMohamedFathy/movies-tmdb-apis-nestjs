
import { Module, Global } from '@nestjs/common';
import { CacheModule as NestCacheModule } from '@nestjs/cache-manager';
import { createKeyv } from '@keyv/redis';
import { ICacheStrategy } from './interfaces/cache-strategy.interface';
import { RedisCacheStrategy } from './strategies/redis-cache.strategy';
import { NoCacheStrategy } from './strategies/no-cache.strategy';
import { CacheContext } from './cache.context';

@Global()
@Module({
  imports: [
    NestCacheModule.registerAsync({
      useFactory: async () => {
        const redisUrl =  process.env.REDIS_URL || 'redis://localhost:6379';
        return {
          stores: [
            createKeyv(redisUrl), //default
          ],
        };
      },
    }),
  ],
  providers: [
    RedisCacheStrategy,
    NoCacheStrategy,
    {
      provide: 'ICacheStrategy', // Provide the interface token
      useFactory: (
        redisStrategy: RedisCacheStrategy,
        noCacheStrategy: NoCacheStrategy,
      ) => {
        const cacheType = 'redis'; // Default to redis

        switch (cacheType.toLowerCase()) {
          case 'redis':
            return redisStrategy;
          case 'none':
            return noCacheStrategy;
          default:
            console.warn(`Unknown cache type: ${cacheType}. Defaulting to Redis cache.`);
            return redisStrategy;
        }
      },
      inject: [
        RedisCacheStrategy,
        NoCacheStrategy,
      ],
    },
    {
      provide: CacheContext,
      useFactory: (strategy: ICacheStrategy) => {
        return new CacheContext(strategy);
      },
      inject: ['ICacheStrategy'],
    },
  ],
  exports: [CacheContext],
})
export class CacheModule {}