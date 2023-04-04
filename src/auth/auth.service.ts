import { Injectable } from '@nestjs/common';
import { OAuth2Client } from 'google-auth-library';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';

const client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
);

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async googleLogin({ token }) {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const { email, name, picture: image } = ticket.getPayload();

    const user = await this.usersService.findOneByEmail({ email });

    if (!user) {
      const user = await this.usersService.create({ email, name, image });
      const payload = user;

      console.log('user', user);
      return {
        ...user,
        access_token: await this.jwtService.signAsync(payload),
      };
    } else {
      const payload = user;

      return {
        ...user,
        access_token: await this.jwtService.signAsync(payload),
      };
    }

    // return {};
  }

  async getUser({ email }) {
    return await this.usersService.findOneByEmail({ email });
  }
}
