import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { createSpyObj } from '../../test/helpers';
import { ConfigService } from '@nestjs/config';
import { User } from 'src/models';

describe('AuthService', () => {
  let service: AuthService;
  let jwtServiceMock: Partial<JwtService>;
  let configServiceMock: Partial<ConfigService>;

  beforeEach(async () => {
    jwtServiceMock = createSpyObj<JwtService>('sign');
    configServiceMock = createSpyObj<ConfigService>('get');

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {provide: JwtService, useValue: jwtServiceMock},
        {provide: ConfigService, useValue: configServiceMock}
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('validateUser', () => {
    it('should validate a valid user based on the config', () => {
      const correctUsername = 'admin';
      const correctPassword = 'changeme';

      jest.spyOn(configServiceMock, 'get')
        .mockImplementation((key) => ({
          DND_TABLE_USERNAME: correctUsername,
          DND_TABLE_PASSWORD: correctPassword,
        }[key]));

      const result = service.validateUser(correctUsername, correctPassword);

      expect(result).toEqual({ username: correctUsername });
    });

    it('should reject an invalid user based on the config', () => {
      const correctUsername = 'admin';
      const correctPassword = 'changeme';

      jest.spyOn(configServiceMock, 'get')
        .mockImplementation((key) => ({
          DND_TABLE_USERNAME: correctUsername,
          DND_TABLE_PASSWORD: correctPassword,
        }[key]));

      const result = service.validateUser('incorrect', correctPassword);

      expect(result).toEqual(undefined);
    });

    it('should reject an invalid password based on the config', () => {
      const correctUsername = 'admin';
      const correctPassword = 'changeme';

      jest.spyOn(configServiceMock, 'get')
        .mockImplementation((key) => ({
          DND_TABLE_USERNAME: correctUsername,
          DND_TABLE_PASSWORD: correctPassword,
        }[key]));

      const result = service.validateUser(correctUsername, 'incorrect');

      expect(result).toEqual(undefined);
    });

    it('should reject an invalid username & password based on the config', () => {
      const correctUsername = 'admin';
      const correctPassword = 'changeme';

      jest.spyOn(configServiceMock, 'get')
        .mockImplementation((key) => ({
          DND_TABLE_USERNAME: correctUsername,
          DND_TABLE_PASSWORD: correctPassword,
        }[key]));

      const result = service.validateUser('incorrect', 'incorrect');

      expect(result).toEqual(undefined);
    });
  });

  describe('login', () => {
    it('should create a new token with the username in the payload', () => {
      const expectedResult = { jwt: 'expected.test.token' };
      const expectedUser: User = {
        username: 'admin',
        password: 'irrelevant',
      };

      jest
        .spyOn(jwtServiceMock, 'sign')
        .mockReturnValueOnce(expectedResult.jwt);

      const result = service.login(expectedUser);

      expect(result)
        .toEqual(expectedResult);
      expect(jwtServiceMock.sign)
        .toHaveBeenCalledWith({ name: expectedUser.username}, { subject: expectedUser.username});
    });
  });
});
