import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Client } from './entities/client.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dtos/register-client.dto';
import { compare, hash } from 'bcrypt';

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(Client)
    private clientRepo: Repository<Client>,
    private jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    const existing = await this.clientRepo.findOne({ where: { email: dto.email } });
    if (existing) throw new BadRequestException('Email already exists');

    const hashed = await hash(dto.password, 10);
    const client = this.clientRepo.create({ ...dto, password: hashed });
    await this.clientRepo.save(client);

    return client;
  }

  async login(email: string, password: string) {
    const client = await this.clientRepo.findOne({ where: { email } });
    if (!client) return null

    const isMatch = await compare(password, client.password);
    if (!isMatch) return null

    return client
  }

  getTokens(client: Client) {
    const payload = { sub: client.id, email: client.email, role: 'client' };
    return {
      'access': this.jwtService.sign(payload),
      'refresh': ''
    };
  }

}

