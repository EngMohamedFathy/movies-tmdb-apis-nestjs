import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from './entities/admin.entity';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Admin]),
    AuthModule,
  ],
  providers: [AdminService],
  controllers: [AdminController],
  exports: [TypeOrmModule],
})
export class AdminModule {}
