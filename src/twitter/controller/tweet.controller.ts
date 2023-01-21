import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { CreateTweetDTO } from '../dto/create-tweet.dto';
import { TweetService } from '../service/tweet.service';

@Controller()
export class TweetController {
    constructor(private readonly tweetService: TweetService) { }

    @Post('/tweet')
    async createTweet(@Body() createTweet: CreateTweetDTO) {
        try {
            const result = await this.tweetService.createTweet(createTweet);
            return result;
        } catch (error) {
            throw new BadRequestException(error)
        }
    }
}