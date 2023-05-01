import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Event, EventDocument } from 'src/schema/event.schema';
import { Vote, VoteDocument } from 'src/schema/vote.schema';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { CreateVoteDto } from './dto/create-vote.dto';
import { User, UserDocument } from 'src/schema/user.schema';

@Injectable()
export class EventsService {
  constructor(
    @InjectModel(Event.name) private eventModel: Model<EventDocument>,
    @InjectModel(Vote.name) private voteModel: Model<VoteDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  create(createEventDto: CreateEventDto, user: User) {
    return this.eventModel.create({
      title: createEventDto.title,
      creator: user,
      created_at: new Date(),
      start: createEventDto.start,
      end: createEventDto.end,
    });
  }

  findAll(user: string) {
    return this.eventModel
      .find({ creator: user })
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
        event: createVoteDto.event,
      }),
      message: 'Your vote has been submitted!',
    };
  }

  async getVotes(id: string) {
    const votes = await this.voteModel
      .find({ event: id })
      .sort({ created_at: 'desc' })
      .lean()
      .exec();

    const result = [];

    for (const item of votes) {
      const user = await this.userModel.findById(item.by).lean().exec();
      result.push({ ...item, by: user });
    }

    return result;
  }
}
