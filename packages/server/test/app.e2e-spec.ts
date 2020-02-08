import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from './../src/app.module';
import * as io from 'socket.io-client';
import { IoAdapter } from '@nestjs/platform-socket.io';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let appAddress: string;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useWebSocketAdapter(new IoAdapter(app));
    await app.init();

    await app.listen(3000);
    appAddress = await app.getUrl();
  });

  // it('/ (GET)', () => {
  //   return request(app.getHttpServer())
  //     .get('/')
  //     .expect(200)
  //     .expect('Hello World!');
  // });

  it('should handle websocket connections', (done) => {
    console.log('TEST STARTED %s', appAddress);
    const ws = io('ws://localhost:3000');

    ws.on('connect', () => console.log('CONNECTED'));

    ws.on('events', (data) => {
        expect(data.toString()).toBe('Hello world!');
        done();
    });

    console.log('ABOUT TO EMIT');
    ws.emit('events', 'Hello?');
  });
});
