import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { UUID } from 'bson';
import { HydratedDocument } from 'mongoose';

export type ConnectionDocument = HydratedDocument<Connection>;

@Schema()
export class Connection {
  @Prop({ type: UUID, auto: true, default: new UUID().toBinary() })
  _id: UUID;

  @Prop()
  ID: number;

  @Prop()
  ConnectionTypeID: number;

  @Prop(
    raw({
      FormalName: { type: String },
      IsDiscontinued: { type: Boolean },
      IsObsolete: { type: Boolean },
      ID: { type: Number },
      Title: { type: String },
    }),
  )
  ConnectionType: Record<string, any>;

  @Prop()
  Reference: string;

  @Prop()
  StatusTypeID: number;

  @Prop(
    raw({
      IsOperational: { type: Boolean },
      IsUserSelectable: { type: Boolean },
      ID: { type: Number },
      Title: { type: String },
    }),
  )
  StatusType: Record<string, any>;

  @Prop()
  LevelID: number;

  @Prop(
    raw({
      Comments: { type: String },
      IsFastChargeCapable: { type: Boolean },
      ID: { type: Number },
      Title: { type: String },
    }),
  )
  Level: Record<string, any>;

  @Prop()
  Amps: number;

  @Prop()
  Voltage: number;

  @Prop()
  PowerKW: number;

  @Prop()
  CurrentTypeID: number;

  @Prop(
    raw({
      Description: { type: String },
      ID: { type: Number },
      Title: { type: String },
    }),
  )
  CurrentType: Record<string, any>;

  @Prop()
  Quantity: number;

  @Prop()
  Comments: string;
}

export const ConnectionSchema = SchemaFactory.createForClass(Connection);
