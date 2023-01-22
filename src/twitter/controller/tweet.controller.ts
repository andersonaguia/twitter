import { BadRequestException, Body, Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/core/auth/guards/jwt-auth.guard';
import { CreateTweetDTO } from '../dto/create-tweet.dto';
import { TweetService } from '../service/tweet.service';

@Controller()
export class TweetController {
    constructor(private readonly tweetService: TweetService) { }

    @UseGuards(JwtAuthGuard)
    @Post('/tweet')
    async createTweet(@Body() createTweet: CreateTweetDTO) {
        try {
            const result = await this.tweetService.createTweet(createTweet);
            return result;
        } catch (error) {
            throw new BadRequestException(error);
        }
    }

    @UseGuards(JwtAuthGuard)
    @Get('/tweet/:userId')
    async findUserTweet(@Param('userId') userId: number){
        try{
            const result = await this.tweetService.findUserTweet(userId);
            return result
        }catch(error){
            throw new BadRequestException(error);
        }
    }

    @UseGuards(JwtAuthGuard)
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