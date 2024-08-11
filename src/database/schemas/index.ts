import { Connection } from 'mongoose';
import { AddressInfo, AddressInfoSchema } from './address-info.schema';
import { Cat, CatSchema } from './cat.schema';
import { ConnectionSchema } from './connection-info.schema';
import { POI, POISchema } from './poi.schema';

export const Schemas = [
  {
    name: Cat.name,
    schema: CatSchema,
  },
  {
    name: AddressInfo.name,
    schema: AddressInfoSchema,
  },
  {
    name: Connection.name,
    schema: ConnectionSchema,
  },
  {
    name: POI.name,
    schema: POISchema,
  },
];
