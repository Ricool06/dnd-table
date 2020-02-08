import { Module } from '@nestjs/common';
import { LoginController } from './login/login.controller';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth/auth.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './auth/local.strategy';
import { JwtStrategy } from './auth/jwt.strategy';
import { GatewayModule } from './gateway/gateway.module';
import { DndGateway } from './gateway/dnd-gateway.gateway';

@Module({
  imports: [
    JwtModule.register({
      secret: 'secretKey',
      signOptions: { expiresIn: '60s' },
    }),
    PassportModule,
    GatewayModule,
  ],
  controllers: [LoginController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
})
export class AppModule {}
