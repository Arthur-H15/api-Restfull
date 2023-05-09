import { Body, Controller, Get, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { AppService } from './app.service';




@Controller()
@UsePipes(new ValidationPipe({whitelist:true}))
export class AppController {
  constructor(private readonly appService: AppService) {}

 
}


