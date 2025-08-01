// src/common/services/current-users.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Admin } from '../../admin/entities/admin.entity';
import { Client } from '../../client/entities/client.entity';
import { AuthPayload } from '../decorators/current-user.decorator';

@Injectable()
export class CurrentUserService {
  constructor(
    @InjectRepository(Admin) private adminRepo: Repository<Admin>,
    @InjectRepository(Client) private clientRepo: Repository<Client>,
  ) {}

  async getEntity(user: AuthPayload) {
    if (user.role === 'admin') {
      return this.adminRepo.findOne({ where: { id: user.userId } });
    }
    if (user.role === 'client') {
      return this.clientRepo.findOne({ where: { id: user.userId } });
    }
    return null;
  }
}
