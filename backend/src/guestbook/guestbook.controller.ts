import { Controller, Get, Post, Body } from '@nestjs/common';
import { GuestbookService } from './guestbook.service';
import { CreateEntryDto } from './dto/create-entry.dto';

@Controller('guestbook')
export class GuestbookController {
  constructor(private readonly guestbookService: GuestbookService) {}

  @Get()
  async findAll() {
    return this.guestbookService.findAll();
  }

  @Post()
  async create(@Body() dto: CreateEntryDto) {
    return this.guestbookService.create(dto);
  }
}
