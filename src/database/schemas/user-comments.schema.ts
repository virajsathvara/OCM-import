import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { UUID } from 'bson';
import { HydratedDocument } from 'mongoose';

export type UserCommentsDocument = HydratedDocument<UserComment>;

@Schema({ collection: 'user-comments' })
export class UserComment {
  @Prop({ type: UUID, auto: true, default: new UUID().toBinary() })
  _id: UUID;

  @Prop({ unique: true })
  ID: number;

  @Prop()
  ChargePointID: number;

  @Prop()
  CommentTypeID: number;

  @Prop(
    raw({
      ID: { type: Number },
      Title: { type: String },
    }),
  )
  CommentType: Record<string, any>;

  @Prop()
  UserName: string;

  @Prop()
  Comment: string;

  @Prop()
  Rating: number;

  @Prop()
  RelatedURL: string;

  @Prop()
  DateCreated: Date;

  /* @Prop({ type: [{ type: Types.UUID, ref: User.name }] })
  @Type(() => User)
  User: UUID; */

  @Prop()
  CheckinStatusTypeID: number;

  @Prop(
    raw({
      IsPositive: { type: Boolean },
      IsAutomatedCheckin: { type: Boolean },
      ID: { type: Number },
      Title: { type: String },
    }),
  )
  CheckinStatusType: Record<string, any>;

  @Prop()
  IsActionedByEditor: boolean;
}

export const UserCommentSchema = SchemaFactory.createForClass(UserComment);
