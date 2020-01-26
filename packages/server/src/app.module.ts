import { Module } from '@nestjs/common';
import { DndGateway } from './dnd-gateway.gateway';
import { LoginController } from './login/login.controller';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth/auth.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './auth/local.strategy';

@Module({
  imports: [
    JwtModule.register({
      secret: 'secretKey',
      signOptions: { expiresIn: '60s' },
    }),
    PassportModule,
  ],
  controllers: [LoginController],
  providers: [DndGateway, AuthService, LocalStrategy],
})
export class AppModule {}
