import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { User } from './user.schema';

export type EventDocument = Event & Document;

@Schema()
export class Event {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  creator: string;

  @Prop({ required: true })
  created_at: Date;
}

export const EventSchema = SchemaFactory.createForClass(Event);
