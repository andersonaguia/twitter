import { Controller } from '@nestjs/common';
import { TwitterService } from '../service/twitter.service';

@Controller('twitter')
export class TwitterController {
  constructor(private readonly twitterService: TwitterService) {}
}
