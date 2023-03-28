// MONGO_URI=mongodb+srv://Taofiq:Salaf@react-nest-database.7fykr2v.mongodb.net/?retryWrites=true&w=majority

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
  name: string;

  @Prop()
  email: string;

  @Prop()
  image: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
