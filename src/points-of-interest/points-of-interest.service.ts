import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import axios from 'axios';
import { Connection, Model } from 'mongoose';
import { AddressInfo } from '../database/schemas/address-info.schema';
import { POI } from '../database/schemas/poi.schema';
import { IPOI } from '../database/interfaces';
import { UUID } from 'bson';

@Injectable()
export class PointsOfInterestService {
  /** ideally this URL and the API key will live in config files
   * to accommodate the URL version changes in future, if any */
  openChargeMapApiUrl = 'https://api.openchargemap.io/v3/poi';
  openChargeMapApiKey = 'ff82541f-c8d1-4507-be67-bd07e3259c4e';
  constructor(
    @InjectModel(AddressInfo.name) private addressInfoModel: Model<AddressInfo>,
    @InjectModel(Connection.name) private connectionModel: Model<Connection>,
    @InjectModel(POI.name) private poiModel: Model<POI>,
  ) {}

  /* async onModuleInit() {
    const data = await this.getPointsOfInterest();
    console.log(data);
  } */

  async getPointsOfInterest() {
    try {
      const POIs: { data: IPOI[] } = await axios.get(this.openChargeMapApiUrl, {
        params: {
          key: this.openChargeMapApiKey,
          maxresults: 2,
          sortby: 'created_desc',
          //  compact: true,
        },
      });

      const poisToBeSaved = [];
      const addressesToBeSaved = [];
      const connectionsToBeSaved = [];
      for (const pointOfInterest of POIs.data) {
        const { address, connections, poi } =
          await this.createPointOfInterest(pointOfInterest);
        poisToBeSaved.push(poi);
        addressesToBeSaved.push(address);
        connectionsToBeSaved.push(...connections);
      }

      await this.addressInfoModel.insertMany(addressesToBeSaved);
      await this.connectionModel.insertMany(connectionsToBeSaved);
      const pois = await this.poiModel.insertMany(poisToBeSaved);
      return pois;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async createPointOfInterest(pointOfInterest: IPOI) {
    const address = new this.addressInfoModel({
      _id: new UUID(),
      ...pointOfInterest.AddressInfo,
    });

    const connections = pointOfInterest.Connections.map(
      (c) =>
        new this.connectionModel({
          _id: new UUID(),
          ...c,
        }),
    );

    const poi = new this.poiModel({ _id: new UUID(), ...pointOfInterest });
    poi.AddressInfo = address._id;
    poi.Connections = connections.map(
      (connection) => new UUID(connection._id.toString()),
    );
    return { address, connections, poi };
  }
}
