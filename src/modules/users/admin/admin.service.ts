import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Admin } from './entities/admin.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin)
    private adminRepo: Repository<Admin>,
    private jwtService: JwtService,
  ) {}

  async login(email: string, password: string) {

    const admin = await this.adminRepo.findOne({ where: { email } });
    if (!admin) return null;

    const isMatch = await compare(password, admin.password);
    if (!isMatch) return null;

    return admin;
  }

  getTokens(admin: Admin) {
    const payload = { sub: admin.id, email: admin.email, role: 'admin' };
    return {
      'access': this.jwtService.sign(payload),
      'refresh': ''
    };
  }
}

