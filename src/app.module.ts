import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PointsOfInterestModule } from './points-of-interest/points-of-interest.module';
import { DatabaseModule } from './database/database.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Schemas } from './database/schemas';
import { OCMLoggerModule } from '../libs/logger/src';

@Module({
  imports: [
    PointsOfInterestModule,
    DatabaseModule,
    MongooseModule.forFeature(Schemas),
    OCMLoggerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
