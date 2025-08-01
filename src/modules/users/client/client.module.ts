import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from './entities/client.entity';
import { ClientController } from './client.controller';
import { ClientService } from './client.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Client]),
    AuthModule,
  ],
  providers: [ClientService],
  controllers: [ClientController],
  exports: [TypeOrmModule],
})
export class ClientModule {}
