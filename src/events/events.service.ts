import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Event, EventDocument } from 'src/schema/event.schema';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';

@Injectable()
export class EventsService {
  constructor(
    @InjectModel(Event.name) private eventModel: Model<EventDocument>,
  ) {}

  create(createEventDto: CreateEventDto, id: string) {
    return this.eventModel.create({
      title: createEventDto.title,
      creator: id,
      created_at: new Date(),
    });
  }

  findAll(id: string) {
    return this.eventModel
      .find({ creator: id })
      .sort({ created_at: 'desc' })
      .exec();
  }

  findOne(id: number) {
    return this.eventModel.findOne({ id: id }).exec();
  }

  update(id: number, updateEventDto: UpdateEventDto) {
    return this.eventModel.findByIdAndUpdate(id, updateEventDto).exec();
  }

  remove(id: number) {
    return this.eventModel.findOneAndRemove({ id: id }).exec();
  }
}
