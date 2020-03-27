import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { createSpyObj } from '../../test/helpers';

describe('AuthService', () => {
  let service: AuthService;
  let jwtServiceMock: Partial<JwtService>;


  beforeEach(async () => {
    jwtServiceMock = createSpyObj<JwtService>();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {provide: JwtService, useValue: jwtServiceMock}
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
