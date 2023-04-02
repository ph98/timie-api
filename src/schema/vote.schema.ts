import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type VoteDocument = Vote & Document;

@Schema()
export class Vote {
  @Prop()
  by: string;

  @Prop()
  event: string;

  @Prop()
  votes: [any];

  @Prop()
  created_at: string;
}

export const VoteSchema = SchemaFactory.createForClass(Vote);
