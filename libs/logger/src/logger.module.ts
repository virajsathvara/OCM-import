import { Global, Module } from '@nestjs/common';
import { OCMLoggerService } from './logger.service';

@Global()
@Module({
  providers: [OCMLoggerService],
  exports: [OCMLoggerService],
})
export class OCMLoggerModule {}
