import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Client } from './entities/client.entity';

@Injectable()
export class ClientSeeder {
  constructor(
    @InjectRepository(Client) private clientRepo: Repository<Client>,
  ) {}

  async seed() {
    console.log('Seeding Clients...');
    const client = this.clientRepo.create({
      name: 'Test Client',
      email: 'client@email.com',
      password: await bcrypt.hash('123456', 10),
    });
    await this.clientRepo.save(client);
    console.log('Clients seeded.');
  }
}
