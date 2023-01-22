import { Module } from '@nestjs/common';
import { databaseProviders } from 'src/core/database/database.providers';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './guards/strategy/jwt.strategy';
import { ConfigModule } from '@nestjs/config';
import { AuthController } from './controller/auth.controller';
import { AuthService } from './service/auth.service';
import { twitterProviders } from '../../twitter/twitter.providers';

@Module({
    imports: [
        JwtModule.register({
            secret: process.env.JWT_SECRET,
            signOptions: {
                expiresIn: 60 * 5 * 6
            }
        }),
        ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    ],
    controllers: [AuthController],
    providers: [
        ...databaseProviders,
        ...twitterProviders,
        JwtStrategy,
        AuthService
    ],
})
export class AuthModule { }