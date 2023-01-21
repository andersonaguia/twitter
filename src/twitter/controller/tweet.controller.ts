import { BadRequestException, Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
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
            throw new BadRequestException(error);
        }
    }

    @Get('/tweet/:userId')
    async findUserTweet(@Param('userId') userId: number){
        try{
            const result = await this.tweetService.findUserTweet(userId);
            return result
        }catch(error){
            throw new BadRequestException(error);
        }
    }

    @Get('/tweet')
    async findTweets(){
        try{
            const result = await this.tweetService.findTweets();
            return result;
        }catch(error){
            throw new BadRequestException(error);
        }
    }

    @Get('/tweets')
    async findTweetsHashtag(@Query('hashtag') hashtag: string){
        try{
            const result = await this.tweetService.findTweetsHashtag(hashtag);
            return result;
        }catch(error){
            throw new BadRequestException(error);
        }
    }



}