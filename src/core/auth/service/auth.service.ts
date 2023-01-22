import { Inject, Injectable} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UserEntity } from 'src/twitter/entities/user.entity';
import { CreateUserDTO } from 'src/twitter/dto/create-user.dto';
import { CredentialsDTO } from '../dto/credentials.dto';
import { TokenDTO } from '../dto/tokem.dto';
import { ChangePasswordDTO } from '../dto/change-password.dto';
import { UpdateUserPasswordDTO } from '../dto/updateUserPassword.dto';

@Injectable()
export class AuthService {

    constructor(private jwtService: JwtService,
        @Inject('USER_REPOSITORY')
        private userRepository: Repository<UserEntity>,
    ) { }

    async signUp(userData: CreateUserDTO): Promise<TokenDTO> {
        return new Promise(async (resolve, reject) => {
            try {
                const { nome, usuario, email, password } = userData;

                const user = this.userRepository.create();
                user.nome = nome;
                user.email = email;
                user.usuario = usuario;
                user.salt = await bcrypt.genSalt(12);
                user.password = await this.hashPassword(password, user.salt);
                const userCreated = await this.userRepository.save(user);
                delete userCreated.password;
                delete userCreated.salt;
                
                const dataToLogin = {
                    email: userCreated.email,
                    password: password
                }

                const login = await this.signIn(dataToLogin)
                
                resolve(login);
            } catch (error) {
                reject(error);
            }
        })
    }

    async signIn(credentials: CredentialsDTO): Promise<TokenDTO> {
        return new Promise(async (resolve, reject) => {
            try {
                const user = await this.checkCredentials(credentials);
                if (user === null) {
                    resolve(null)
                }
                const firstName = user.nome.split(' ');

                const jwtPayload = {
                    id: user.id,
                    firstName: firstName[0],
                    email: user.email,
                }
                const token = new TokenDTO();
                token.token = this.jwtService.sign(jwtPayload);
                resolve(token)
            } catch (error) {
                reject({
                    code: error.code,
                    detail: error.detail
                });
            }
        })
    }

    async checkCredentials(credentials: CredentialsDTO) {
        const { email, password } = credentials;
        const user = await this.userRepository.findOne({
            where: {
                email: email
            }
        })

        if (user && (await user.checkPassword(password))) {
            return user;
        }
        return null;
    }

    async hashPassword(password: string, salt: string): Promise<string> {
        return bcrypt.hash(password, salt);
    }

    validateToken(jwtToken: string) {
        return new Promise(async (resolve, reject) => {
            try {
                resolve(await this.jwtService.verifyAsync(jwtToken, {
                    ignoreExpiration: false
                }))
            } catch (error) {
                reject({
                    code: 401,
                    detail: 'JWT expired.'
                })
            }
        })
    }

    decodedToken(jwtToken: string) {
        return this.jwtService.decode(jwtToken);
    }

    async changePassword(data: ChangePasswordDTO): Promise<number> {
        const { email, oldPassword, newPassword } = data;
        return new Promise(async (resolve, reject) => {
            try {
                const credentials: CredentialsDTO = new CredentialsDTO()
                credentials.email = email;
                credentials.password = oldPassword;

                const user = await this.checkCredentials(credentials);

                if (user === null) {
                    resolve(null);
                }
                const dataToUpdate = new UpdateUserPasswordDTO();
                dataToUpdate.password = await this.hashPassword(newPassword, user.salt);
                dataToUpdate.updatedAt = new Date();
                user.salt = await bcrypt.genSalt(12);

                const success = await this.updateUserPassword(user.id, dataToUpdate);
                resolve(success);
            } catch (error) {
                reject({
                    code: error.code,
                    detail: error.detail
                });
            }
        })
    }

    updateUserPassword(id: number, dataToUpdate: UpdateUserPasswordDTO): Promise<number> {
        return new Promise(async (resolve, reject) => {
            try {
                const { affected } = await this.userRepository.update({ id: id }, dataToUpdate);
                if (affected === 0) {
                    resolve(affected)
                }
                resolve(affected)
            } catch (error) {
                reject({
                    code: error.code,
                    detail: error.detail
                })
            }
        })
    }
}