import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type VoteDocument = Vote & Document;

@Schema()
export class Vote {
  @Prop({ required: true })
  by: string;

  @Prop({ required: true })
  event: string;

  @Prop({ required: true })
  votes: [any];

  @Prop({ required: true })
  created_at: Date;
}

export const VoteSchema = SchemaFactory.createForClass(Vote);
