import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateTweetDTO } from '../dto/create-tweet.dto';
import { CreateUserDTO } from '../dto/create-user.dto';
import { TweetEntity } from '../entities/tweet.entity';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class TweetService {
    constructor(
        @Inject('TWEET_REPOSITORY')
        private readonly tweetRepository: Repository<TweetEntity>
    ) { }

    async createTweet(tweetData: CreateTweetDTO) {
        return new Promise(async (resolve, reject) => {
            try {           
                const tweetToCreate = this.tweetRepository.create();
                const userId = new UserEntity();
                userId.id = tweetData.user;
                tweetToCreate.user = userId;
                tweetToCreate.tweet = tweetData.tweet;
                tweetToCreate.createdDate = new Date()
                const tweetToBeSaved = await this.tweetRepository.save(tweetToCreate);
                resolve(tweetToBeSaved);
            } catch (error) {
                reject(error);
            }
        })
    }
}