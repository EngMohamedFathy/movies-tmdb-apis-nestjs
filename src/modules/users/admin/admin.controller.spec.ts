import { Test, TestingModule } from '@nestjs/testing';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { LoginDto } from '../client/dtos/login-client.dto';

describe('AuthController', () => {
  let controller: AdminController;
  let authService: AdminService;

  const mockAdminService = {
    validateAdmin: jest.fn(),
    getTokens: jest.fn().mockReturnValue({ access: 'mockAccessToken', refresh: 'mockRefreshToken' }),
  };

  const mockAuthService = {
    login: jest.fn().mockResolvedValue(mockAdminService),
  };

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [AdminController],
      providers: [{ provide: AdminService, useValue: mockAuthService }],
    }).compile();

    controller = moduleRef.get<AdminController>(AdminController);

  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  // it('should return an object containing a token from login', async () => {
  //   const loginDto: LoginDto = {
  //     email: 'admin@email.com',
  //     password: '123456',
  //   };
  //
  //   const result = await controller.login(loginDto);
  //
  //   expect(result).toHaveProperty('tokens.access');
  //   expect(mockAuthService.login).toHaveBeenCalledWith(loginDto.email, loginDto.password);
  // });
});