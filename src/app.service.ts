import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cat } from './database/schemas/cat.schema';
import { Model } from 'mongoose';

@Injectable()
export class AppService {
  constructor(@InjectModel(Cat.name) private catModel: Model<Cat>) {}

  async onModuleInit() {
    await this.create({ name: 'Kitty', age: 2, breed: 'Persian' });
  }

  getHello(): string {
    return 'Hello World!';
  }

  async create(createCatDto: {
    name: string;
    age: number;
    breed: string;
  }): Promise<Cat> {
    const createdCat = new this.catModel(createCatDto);
    return createdCat.save();
  }

  async findAll(): Promise<Cat[]> {
    return this.catModel.find().exec();
  }
}
