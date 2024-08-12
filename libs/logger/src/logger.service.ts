import { Injectable, Logger, LoggerService } from '@nestjs/common';

@Injectable()
export class OCMLoggerService implements LoggerService {
  logger: Logger;
  constructor() {
    this.logger = new Logger('OCM-Logger');
  }

  log(message: string, ...optionalParams: any[]) {
    this.logger.log(message, ...optionalParams);
  }

  error(message: string, ...optionalParams: any[]) {
    this.logger.error(message, ...optionalParams);
  }

  warn(message: string, ...optionalParams: any[]) {
    this.logger.warn(message, ...optionalParams);
  }
}
