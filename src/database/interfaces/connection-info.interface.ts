import { Document, Types } from 'mongoose';

export interface IConnectionInfo extends Document {
  _id: Types.UUID;
  ID: number;
  ConnectionTypeID: number;
  ConnectionType: {
    FormalName: string;
    IsDiscontinued: boolean;
    IsObsolete: boolean;
    ID: number;
    Title: string;
  };
  Reference: string;
  StatusTypeID: number;
  StatusType: {
    IsOperational: boolean;
    IsUserSelectable: boolean;
    ID: number;
    Title: string;
  };
  LevelID: number;
  Level: {
    Comments: string;
    IsFastChargeCapable: boolean;
    ID: number;
    Title: string;
  };
  Amps: number;
  Voltage: number;
  PowerKW: number;
  CurrentTypeID: number;
  CurrentType: {
    Description: string;
    ID: number;
    Title: string;
  };
  Quantity: number;
  Comments: string;
}
