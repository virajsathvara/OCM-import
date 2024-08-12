import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import axios from 'axios';
import { Connection, Model } from 'mongoose';
import { AddressInfo } from '../database/schemas/address-info.schema';
import { POI } from '../database/schemas/poi.schema';
import { IPOI } from '../database/interfaces';
import { UUID } from 'bson';
import { OCMLoggerService } from '@app/logger';
import { UserComment } from '../database/schemas/user-comments.schema';
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
    @InjectModel(UserComment.name) private userCommentModel: Model<UserComment>,
    private readonly logger: OCMLoggerService,
  ) {}

  async onModuleInit() {
    const data = await this.concurrentImportOfPointsOfInterests();
    console.log(data);
  }

  async concurrentImportOfPointsOfInterests() {
    this.logger.log(
      'Importing Points of Interests concurrently',
      'POI-SERVICE',
    );
    try {
      let createdsince: string = null;
      while (true) {
        const POIs: { data: IPOI[] } = await axios.get(
          this.openChargeMapApiUrl,
          {
            params: {
              key: this.openChargeMapApiKey,
              maxresults: 2000,
              sortby: 'created_asc',
              createdsince,
              //  compact: true,
            },
          },
        );
        createdsince = POIs.data[POIs.data.length - 1].DateCreated;

        /** while loop breaks if there are no records */
        if (POIs.data.length === 0) break;

        const poisToBeSaved: POI[] = [];
        const addressesToBeSaved: AddressInfo[] = [];
        const connectionsToBeSaved: Connection[] = [];
        const userCommentsToBeSaved: UserComment[] = [];

        for (const pointOfInterest of POIs.data) {
          const { address, connections, poi, userComments } =
            await this.createPointOfInterest(pointOfInterest);
          poisToBeSaved.push(poi);
          addressesToBeSaved.push(address);
          connectionsToBeSaved.push(...connections);
          userCommentsToBeSaved.push(...userComments);
        }

        await Promise.all([
          this.saveInChunks(addressesToBeSaved, 'address'),
          this.saveInChunks(connectionsToBeSaved, 'connection'),
          this.saveInChunks(userCommentsToBeSaved, 'userComment'),
          this.saveInChunks(poisToBeSaved, 'poi'),
        ]);

        this.logger.log(
          `Imported ${poisToBeSaved.length} Points of Interests, startTimeStamp: ${POIs.data[0].DateCreated}, endTimeStamp: ${createdsince}`,
          'POI-SERVICE',
        );
      }

      this.logger.log('Importing Points of Interests completed', 'POI-SERVICE');
      return true;
    } catch (error) {
      this.logger.error(error, 'POI-SERVICE');
      return null;
    }
  }
  /* private async getPointsOfInterest() {
    try {
      const POIs: { data: IPOI[] } = await axios.get(this.openChargeMapApiUrl, {
        params: {
          key: this.openChargeMapApiKey,
          maxresults: 2000,
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

      await this.addressInfoModel.insertMany(addressesToBeSaved, {});
      await this.connectionModel.insertMany(connectionsToBeSaved);
      const pois = await this.poiModel.insertMany(poisToBeSaved);
      return pois;
    } catch (error) {
      console.error(error);
      return null;
    }
  } */

  private async createPointOfInterest(pointOfInterest: IPOI) {
    /** address model */
    const address = new this.addressInfoModel({
      _id: new UUID(),
      ...pointOfInterest.AddressInfo,
    });

    /** connection model */
    const connections = pointOfInterest.Connections.map(
      (c) =>
        new this.connectionModel({
          _id: new UUID(),
          ...c,
        }),
    );

    let userComments: UserComment[] = [];
    if (pointOfInterest.UserComments?.length) {
      userComments = pointOfInterest.UserComments.map((comment) => {
        return new this.userCommentModel({
          _id: new UUID(),
          ...comment,
        });
      });
    }

    /** poi model */
    const poi = new this.poiModel({ _id: new UUID(), ...pointOfInterest });
    poi.AddressInfo = address._id;
    poi.Connections = connections.map(
      (connection) => new UUID(connection._id.toString()),
    );
    if (userComments.length) {
      poi.UserComments = userComments.map(
        (comment) => new UUID(comment._id.toString()),
      );
    }
    return { address, connections, poi, userComments };
  }

  private async saveInChunks(
    data: POI[] | AddressInfo[] | Connection[] | UserComment[],
    model: 'address' | 'poi' | 'connection' | 'userComment',
  ) {
    const chunkSize = 1000;
    for (let i = 0; i < data.length; i += chunkSize) {
      const chunk = data.slice(i, i + chunkSize);

      switch (model) {
        case 'address':
          await this.addressInfoModel.insertMany(chunk);
        case 'poi':
          await this.poiModel.insertMany(chunk);
        case 'connection':
          await this.connectionModel.insertMany(chunk);
        case 'userComment':
          await this.userCommentModel.insertMany(chunk);
        default:
          break;
      }
    }
    return true;
  }
}
