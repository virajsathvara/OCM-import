import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PointsOfInterestModule } from './points-of-interest/points-of-interest.module';

@Module({
  imports: [PointsOfInterestModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
