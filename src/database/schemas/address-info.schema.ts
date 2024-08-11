import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { UUID } from 'bson';
import { HydratedDocument } from 'mongoose';

export type AddressInfoDocument = HydratedDocument<AddressInfo>;

@Schema()
export class AddressInfo {
  @Prop({ type: UUID, auto: true, default: new UUID().toBinary() })
  _id: UUID;

  @Prop()
  ID: number;

  @Prop()
  Title: string;

  @Prop()
  AddressLine1: string;

  @Prop()
  AddressLine2: string;

  @Prop()
  Town: string;

  @Prop()
  StateOrProvince: string;

  @Prop()
  Postcode: string;

  @Prop()
  CountryID: number;

  @Prop(
    raw({
      ISOCode: { type: String },
      ContinentCode: { type: String },
      ID: { type: Number },
      Title: { type: String },
    }),
  )
  Country: Record<string, any>;

  @Prop()
  Latitude: number;

  @Prop()
  Longitude: number;

  @Prop()
  ContactTelephone1: string;

  @Prop()
  ContactTelephone2: string;

  @Prop()
  ContactEmail: string;

  @Prop()
  AccessComments: string;

  @Prop()
  RelatedURL: string;

  @Prop()
  Distance: number;

  @Prop()
  DistanceUnit: number;
}

export const AddressInfoSchema = SchemaFactory.createForClass(AddressInfo);
