import { Module } from '@nestjs/common';
import { PointsOfInterestService } from './points-of-interest.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Schemas } from '../database/schemas';

@Module({
  imports: [MongooseModule.forFeature(Schemas)],
  exports: [PointsOfInterestService],
  providers: [PointsOfInterestService],
})
export class PointsOfInterestModule {}
