import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminModule } from './modules/users/admin/admin.module';
import { ClientModule } from './modules/users/client/client.module';
import { AuthModule } from './modules/users/auth/auth.module';
import { SeederModule } from './seeder/seeder.module';
import { AcceptLanguageResolver, I18nModule } from 'nestjs-i18n';
import * as path from 'node:path';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { I18nContextInterceptor } from './common/interceptors/i18-context-interceptor';
import { MoviesModule } from './modules/movies/movies.module';
import { CacheModule } from './shared/cache/cache.module';
import { ScheduleModule } from '@nestjs/schedule';
import { ConfigModule } from '@nestjs/config';
import { AppDataSource } from './data-source';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // makes config available everywhere without importing
    }),
    TypeOrmModule.forRoot({
      ...AppDataSource.options
    }),
    I18nModule.forRoot({
      fallbackLanguage: 'en',
      loaderOptions: {
        path: path.join(__dirname, '../src/i18n/'),
        watch: true,
      },
      resolvers: [
        { use: AcceptLanguageResolver, options: ['lang', 'locale', 'l'] },
      ],
    }),
    ScheduleModule.forRoot(),
    AdminModule,
    ClientModule,
    AuthModule,
    SeederModule,
    MoviesModule,
    CacheModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: I18nContextInterceptor,
    },
  ],
})
export class AppModule {}
