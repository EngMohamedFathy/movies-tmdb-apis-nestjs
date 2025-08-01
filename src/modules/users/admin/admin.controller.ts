import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminLoginDto } from './dtos/login-admin.dto';
import { responseError, responseSuccess } from '../../../common/helpers/response.helper';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags("Admin Auth")
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('auth/login')
  async login(@Body() dto: AdminLoginDto) {
    let admin = await this.adminService.login(dto.email, dto.password);

    if(!admin) return responseError('invalid credentials',null,HttpStatus.UNAUTHORIZED);

    const tokens = this.adminService.getTokens(admin);

    return responseSuccess('login successfully',{admin,tokens});
  }
}
