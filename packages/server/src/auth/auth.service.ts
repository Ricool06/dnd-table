import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  validateUser(username: string, password: string) {
    return (username === 'ricool' && password === 'pass')
    ? { username }
    : undefined;
  }

  login(user) {
    const payload = { sub: user.username };
    return { jwt: this.jwtService.sign(payload) };
  }
}
