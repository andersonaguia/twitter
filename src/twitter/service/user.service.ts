import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateUserDTO } from '../dto/create-user.dto';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class UserService {
    constructor(
        @Inject('USER_REPOSITORY')
        private readonly userRepository: Repository<UserEntity>
    ) { }

    async createUser(user: CreateUserDTO) {
        return new Promise(async (resolve, reject) => {
            try {
                const userToCreate = this.userRepository.create(user);
                const userToBeSaved = await this.userRepository.save(userToCreate);
                resolve(userToBeSaved);
            } catch (error) {
                reject(error);
            }
        })
    }
}
