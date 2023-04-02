import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { UsersService } from 'src/users/users.service';

@UseGuards(AuthGuard)
@Controller('events')
export class EventsController {
  constructor(
    private readonly eventsService: EventsService,
    private readonly userService: UsersService,
  ) {}

  @Post()
  create(@Body() createEventDto: CreateEventDto, @Request() req) {
    return this.eventsService.create(createEventDto, req.user._id);
  }

  @Get()
  findAll(@Request() req) {
    return this.eventsService.findAll(req.user._id);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const event = await this.eventsService.findOne(id);

    return {
      event: {
        ...event,
        creator: await this.userService.findById(event.creator),
      },
      votes: (await this.eventsService.getVotes(id)).map((item) => ({
        ...item,
        // by:  this.userService.findById(item.by),
      })),
    };
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEventDto: UpdateEventDto) {
    return this.eventsService.update(id, updateEventDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eventsService.remove(id);
  }

  @Post(':id')
  createVote(@Param('id') id: string, @Request() req, @Body() body: any) {
    return this.eventsService.addVote({
      event: id,
      by: req.user._id,
      created_at: new Date(),
      votes: body.votes,
    });
  }
}
