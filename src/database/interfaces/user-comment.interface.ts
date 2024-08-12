import { Document, Types } from 'mongoose';

export interface IUserComment extends Document {
  _id: Types.UUID;
  ID: number;
  ChargePointID: number;
  CommentTypeID: number;
  CommentType: {
    ID: number;
    Title: string;
  };
  UserName: string;
  Comment: string;
  Rating: number;
  RelatedURL: string;
  DateCreated: Date;
  CheckinStatusTypeID: number;
  CheckinStatusType: {
    IsPositive: boolean;
    IsAutomatedCheckin: boolean;
    ID: number;
    Title: string;
  };
  IsActionedByEditor: boolean;
}
