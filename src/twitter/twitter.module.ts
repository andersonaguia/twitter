import { Module } from '@nestjs/common';
import { TwitterController } from './controller/twitter.controller';
import { TwitterService } from './service/twitter.service';

@Module({
  controllers: [TwitterController],
  providers: [TwitterService]
})
export class TwitterModule {}
