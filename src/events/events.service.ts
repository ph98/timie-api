import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Event, EventDocument } from 'src/schema/event.schema';
import { Vote, VoteDocument } from 'src/schema/vote.schema';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { CreateVoteDto } from './dto/create-vote.dto';

@Injectable()
export class EventsService {
  constructor(
    @InjectModel(Event.name) private eventModel: Model<EventDocument>,
    @InjectModel(Vote.name) private voteModel: Model<VoteDocument>,
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

  findOne(id: string) {
    return this.eventModel.findById(id).lean().exec();
  }

  update(id: string, updateEventDto: UpdateEventDto) {
    return this.eventModel.findByIdAndUpdate(id, updateEventDto).exec();
  }

  remove(id: string) {
    return this.eventModel.findOneAndRemove({ id: id }).exec();
  }

  async addVote(createVoteDto: CreateVoteDto) {
    const prevVote = await this.voteModel
      .findOne({
        by: createVoteDto.by,
        event: createVoteDto.event,
      })
      .exec();
    console.log('first', prevVote);
    if (prevVote) {
      return {
        data: await this.voteModel
          .findOneAndUpdate(
            { by: createVoteDto.by, event: createVoteDto.event },
            createVoteDto,
          )
          .exec(),
        message: 'Your vote has been updated!',
      };
    }
    return {
      data: await this.voteModel.create({
        ...createVoteDto,
      }),
      message: 'Your vote has been submitted!',
    };
  }

  getVotes(id: string) {
    return this.voteModel
      .find({ event: id })
      .sort({ created_at: 'desc' })
      .lean()
      .exec();
  }
}
