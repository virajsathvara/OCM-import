import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Schemas } from './schemas';
import { config } from '../config';

const MONGO_URI = config.database.uri
  .replace('<username>', config.database.username)
  .replace('<password>', config.database.password);
@Module({
  imports: [
    MongooseModule.forRoot(MONGO_URI, {
      dbName: 'chargemap_pois',
    }),
    MongooseModule.forFeature(Schemas),
  ],
})
export class DatabaseModule {}
