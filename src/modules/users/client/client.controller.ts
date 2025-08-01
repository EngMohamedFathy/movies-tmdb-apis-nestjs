import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { ClientService } from './client.service';
import { RegisterDto } from './dtos/register-client.dto';
import { responseError, responseSuccess } from '../../../common/helpers/response.helper';
import { Client } from './entities/client.entity';
import { LoginDto } from './dtos/login-client.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags("Client Auth")
@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Post('auth/register')
  async register(@Body() dto: RegisterDto) {
    let client = await this.clientService.register(dto);

    const tokens = this.clientService.getTokens(client);

    return responseSuccess('register successfully',{client,tokens});

  }

  @Post('auth/login')
  async login(@Body() dto: LoginDto) {
    let client = await this.clientService.login(dto.email, dto.password);

    if(!client) return responseError('invalid credentials',null,HttpStatus.UNAUTHORIZED);

    const tokens = this.clientService.getTokens(client);

    return responseSuccess('login successfully',{client,tokens});
  }
}
