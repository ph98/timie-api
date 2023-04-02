import { Event, EventSchema } from './../schema/event.schema';
import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Vote, VoteSchema } from 'src/schema/vote.schema';
import { User, UserSchema } from 'src/schema/user.schema';
import { UsersService } from 'src/users/users.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Event.name, schema: EventSchema },
      { name: Vote.name, schema: VoteSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  controllers: [EventsController],
  providers: [EventsService, UsersService],
})
export class EventsModule {}
