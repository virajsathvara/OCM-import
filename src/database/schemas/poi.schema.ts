import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { AddressInfo } from './address-info.schema';
import { Connection } from './connection-info.schema';
import { Type } from 'class-transformer';
import { UUID } from 'bson';
import { UserComment } from './user-comments.schema';

export type POIDocument = HydratedDocument<POI>;

@Schema({ collection: 'points-of-interest' })
export class POI {
  @Prop({ type: UUID, auto: true, default: new UUID().toBinary() })
  _id: UUID;

  @Prop({ unique: true })
  ID: number;

  @Prop()
  UUID: string;

  @Prop(
    raw({
      WebsiteURL: { type: String },
      Comments: { type: String },
      DataProviderStatusType: {
        IsProviderEnabled: { type: Boolean },
        ID: { type: Number },
        Title: { type: String },
      },
      IsRestrictedEdit: { type: Boolean },
      IsOpenDataLicensed: { type: Boolean },
      IsApprovedImport: { type: Boolean },
      License: { type: String },
      DateLastImported: { type: Date },
      ID: { type: Number },
      Title: { type: String },
    }),
  )
  DataProvider: Record<string, any>;

  @Prop(
    raw({
      WebsiteURL: { type: String },
      Comments: { type: String },
      PhonePrimaryContact: { type: String },
      PhoneSecondaryContact: { type: String },
      IsPrivateIndividual: { type: Boolean },
      AddressInfo: { type: String },
      BookingURL: { type: String },
      ContactEmail: { type: String },
      FaultReportEmail: { type: String },
      IsRestrictedEdit: { type: Boolean },
      ID: { type: Number },
      Title: { type: String },
    }),
  )
  OperatorInfo: Record<string, any>;

  @Prop(
    raw({
      IsPayAtLocation: { type: Boolean },
      IsMembershipRequired: { type: Boolean },
      IsAccessKeyRequired: { type: Boolean },
      ID: { type: Number },
      Title: { type: String },
    }),
  )
  UsageType: Record<string, any>;

  @Prop(
    raw({
      IsOperational: { type: Boolean },
      IsUserSelectable: { type: Boolean },
      ID: { type: Number },
      Title: { type: String },
    }),
  )
  StatusType: Record<string, any>;

  @Prop(
    raw({
      IsLive: { type: Boolean },
      ID: { type: Number },
      Title: { type: String },
    }),
  )
  SubmissionStatus: Record<string, any>;

  @Prop({ type: [{ type: Types.UUID, ref: UserComment.name }] })
  @Type(() => UserComment)
  UserComments: UUID[];

  @Prop()
  PercentageSimilarity: number;

  @Prop()
  MediaItems: Record<string, any>[];

  @Prop()
  IsRecentlyVerified: boolean;

  @Prop()
  DateLastVerified: Date;

  @Prop()
  ParentChargePointID: number;

  @Prop()
  DataProviderID: number;

  @Prop()
  DataProvidersReference: string;

  @Prop()
  OperatorID: number;

  @Prop()
  OperatorsReference: string;

  @Prop()
  UsageTypeID: number;

  @Prop()
  UsageCost: string;

  @Prop({ type: Types.UUID, ref: AddressInfo.name })
  @Type(() => AddressInfo)
  AddressInfo: UUID;

  @Prop({ type: [{ type: Types.UUID, ref: Connection.name }] })
  @Type(() => Connection)
  Connections: UUID[];

  @Prop()
  NumberOfPoints: number;

  @Prop()
  GeneralComments: string;

  @Prop()
  DatePlanned: Date;

  @Prop()
  DateLastConfirmed: Date;

  @Prop()
  StatusTypeID: number;

  @Prop()
  DateLastStatusUpdate: Date;

  @Prop()
  MetadataValues: Record<string, any>[];

  @Prop()
  DataQualityLevel: number;

  @Prop()
  DateCreated: Date;

  @Prop()
  SubmissionStatusTypeID: number;
}

export const POISchema = SchemaFactory.createForClass(POI);
