import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Admin } from './entities/admin.entity';

@Injectable()
export class AdminSeeder {
  constructor(
    @InjectRepository(Admin) private adminRepo: Repository<Admin>,
  ) {}

  async seed() {
    console.log('Start Seeding Admins...');
    const admin = this.adminRepo.create({
      name: "admin",
      email: 'admin@email.com',
      password: await bcrypt.hash('123456', 10),
    });
    await this.adminRepo.save(admin);
    console.log('Admins seeded.');
  }
}
