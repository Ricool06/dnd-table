import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from './../src/app.module';
import * as io from 'socket.io-client';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { SetImageMessage } from 'src/models';
import * as request from 'supertest';
import { JwtService } from '@nestjs/jwt';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let appAddress: string;
  let overriddenJwtService: JwtService;

  beforeEach(async () => {
    overriddenJwtService = new JwtService({ secret: 'test', signOptions: { expiresIn: '60s' } });

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
    .overrideProvider(JwtService).useValue(overriddenJwtService)
    .compile();

    app = moduleFixture.createNestApplication();
    app.useWebSocketAdapter(new IoAdapter(app));
    await app.init();

    await app.listen(3000);
    appAddress = await app.getUrl();
  });

  it('should allow users to log in', (done) => {
    const body = { username: 'ricool', password: 'pass' };
    const expectedToken = overriddenJwtService
      .sign({ username: body.username }, { subject: body.username });

    request(appAddress)
      .post('/dm/login')
      .send()
      .expect(200)
      .expect({ jwt: expectedToken })
      .end((err) => done(err));
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
