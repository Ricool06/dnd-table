import { Module } from '@nestjs/common';
import { LoginController } from './login/login.controller';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth/auth.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './auth/local.strategy';
import { JwtStrategy } from './auth/jwt.strategy';
import { GatewayModule } from './gateway/gateway.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    JwtModule.register({
      secret: 'test',
      signOptions: { expiresIn: '60s' },
    }),
    PassportModule,
    GatewayModule,
    ConfigModule,
  ],
  controllers: [LoginController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
})
export class AppModule {}
