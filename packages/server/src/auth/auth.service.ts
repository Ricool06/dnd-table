import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/models';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  validateUser(username: string, password: string) {
    return (username === 'ricool' && password === 'pass')
    ? { username }
    : undefined;
  }

  login(user: User) {
    const payload = { name: user.username };
    return { jwt: this.jwtService.sign(payload, { subject: user.username }) };
  }
}
