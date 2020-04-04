import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/models';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService) { }

  validateUser(username: string, password: string) {
    const validUsername = this.configService.get('DND_TABLE_USERNAME');
    const validPassword = this.configService.get('DND_TABLE_PASSWORD');

    return (username === validUsername && password === validPassword)
      ? { username }
      : undefined;
  }

  login(user: User) {
    const payload = { name: user.username };
    return { jwt: this.jwtService.sign(payload, { subject: user.username }) };
  }
}
