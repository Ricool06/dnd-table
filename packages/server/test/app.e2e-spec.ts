import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { JwtPayload, User } from 'src/models';
import * as request from 'supertest';
import { JwtService } from '@nestjs/jwt';
import { AppModule } from '../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let appAddress: string;
  let overriddenJwtService: JwtService;
  let overriddenConfigService: ConfigService;

  beforeAll(async () => {
    overriddenJwtService = new JwtService({ secret: 'meme', signOptions: { expiresIn: '60s' } });
    overriddenConfigService = new ConfigService({
      DND_TABLE_USERNAME: 'admin',
      DND_TABLE_PASSWORD: 'changeme'
    });

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(ConfigService).useValue(overriddenConfigService)
      .overrideProvider(JwtService).useValue(overriddenJwtService)
      .compile();

    app = moduleFixture.createNestApplication();
    app.useWebSocketAdapter(new IoAdapter(app));
    await app.init();

    await app.listen(3000);
    appAddress = await app.getUrl();
  });

  it('should allow valid users to log in', async () => {
    const body: User = {
      username: overriddenConfigService.get('DND_TABLE_USERNAME'),
      password: overriddenConfigService.get('DND_TABLE_PASSWORD'),
    };

    const expectedToken = overriddenJwtService
      .sign(
        { name: body.username } as JwtPayload,
        { subject: body.username },
      );

    await request(appAddress)
      .post('/dm/login')
      .send(body)
      .expect(200)
      .expect({ jwt: expectedToken });
  });

  it('should not allow invalid users to log in', async () => {
    const body: User = {
      username: 'notValidUser',
      password: 'notValidPassword',
    };

    await request(appAddress)
      .post('/dm/login')
      .send(body)
      .expect(401);
  });

  // it('should allow users to upload an image, then emit a set image message', (done) => {
  //   console.log(`APP ADDRESS: ${appAddress}`);
  //   const ws = io(appAddress);
  //   const expectedImage = 'iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAIAAAD91JpzAAAACXBIWXMAAC4jAAAuIwF4pT92AAAAFklEQVQI12P4z8DAwPCfheE/AwMDIwAaEQMDtXIIUQAAAABJRU5ErkJggg==';

  //   ws.on('set image', (data: SetImageMessage) => {
  //     expect(data.image).toBe(expectedImage);
  //     done();
  //   });

  //   ws.emit('upload image', expectedImage);
  // });
});
