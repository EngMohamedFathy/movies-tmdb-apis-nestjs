import { Test, TestingModule } from '@nestjs/testing';
import { AdminService } from './admin.service';
import { JwtService } from '@nestjs/jwt';

// Mock AdminRepository
const mockAdminRepository = {
  findOneBy: jest.fn(),
  save: jest.fn(),
};

// Mock JwtService
const mockJwtService = {
  signAsync: jest.fn().mockResolvedValue('mocked.jwt.token'),
};

describe('AdminService', () => {
  let service: AdminService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AdminService,
        { provide: 'AdminRepository', useValue: mockAdminRepository },
        { provide: JwtService, useValue: mockJwtService },
      ],
    }).compile();

    service = module.get<AdminService>(AdminService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
