import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { CreateUserDTO } from '../dto/create-user.dto';
import { UserService } from '../service/user.service';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post('/user')
  async createUser(@Body() createUserDto: CreateUserDTO) {
    try{
      const result = await this.userService.createUser(createUserDto);
      return result;
    }catch(error){
      throw new BadRequestException(error)
    }    
  }

  // @Post()
  // create(@Body() createTwitterDto: CreateTwitterDto) {
  //   return this.twitterService.create(createTwitterDto);
  // }

  // @Get()
  // findAll() {
  //   return this.twitterService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.twitterService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateTwitterDto: UpdateTwitterDto) {
  //   return this.twitterService.update(+id, updateTwitterDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.twitterService.remove(+id);
  // }
}