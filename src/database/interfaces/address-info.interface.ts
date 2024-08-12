import { Document, Types } from 'mongoose';

export interface IAddressInfo extends Document {
  _id: Types.UUID;
  ID: number;
  Title: string;
  AddressLine1: string;
  AddressLine2: string;
  Town: string;
  StateOrProvince: string;
  Postcode: string;
  CountryID: number;
  Country: {
    ISOCode: string;
    ContinentCode: string;
    ID: number;
    Title: string;
  };
  Latitude: number;
  Longitude: number;
  ContactTelephone1: string;
  ContactTelephone2: string;
  ContactEmail: string;
  AccessComments: string;
  RelatedURL: string;
  Distance: number;
  DistanceUnit: number;
}
