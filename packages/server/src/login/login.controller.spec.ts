import { Test, TestingModule } from '@nestjs/testing';
import { LoginController } from './login.controller';
import { AuthService } from '../auth/auth.service';
import { createSpyObj } from '../../test/helpers';

describe('Login Controller', () => {
  let controller: LoginController;
  let authServiceMock: Partial<AuthService>;
  const validJwt = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9'
    + '.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ'
    + '.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';

  beforeEach(async () => {
    authServiceMock = createSpyObj<AuthService>('login');

    const module: TestingModule = await Test.createTestingModule({
      controllers: [LoginController],
      providers: [
        {provide: AuthService, useValue: authServiceMock}
      ]
    }).compile();

    controller = module.get<LoginController>(LoginController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should allow valid users to login', () => {
    const expectedResult = { jwt: validJwt };
    const spy = jest.spyOn(authServiceMock, 'login');
    spy.mockImplementationOnce(() => expectedResult);

    const result = controller.loginDm({ username: 'meme', password: 'pass' });

    expect(result).toEqual(expectedResult);
  });
});

// function createSpyObj(baseName: string, methodNames: )