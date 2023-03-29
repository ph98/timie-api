import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { User, UserDocument } from '../schema/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}
  async findOne({ email }: { email: string }): Promise<User | undefined> {
    return await this.userModel.findOne({ email }).lean();
  }
  async create({ email, name, image }): Promise<User | undefined> {
    const newUser = new this.userModel({ email, name, image });
    await newUser.save();
    return newUser.toObject();
  }
}
