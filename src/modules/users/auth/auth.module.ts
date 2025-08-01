import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { CurrentUserService } from './services/current-user.services';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: 'your_jwt_secret', // move to env in prod!
      signOptions: { expiresIn: '7d' },
    }),

  ],
  providers: [JwtStrategy],
  exports: [JwtModule],
})
export class AuthModule {}
