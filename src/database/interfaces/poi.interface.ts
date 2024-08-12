import { UserComment } from '../schemas/user-comments.schema';
import { IAddressInfo } from './address-info.interface';
import { IConnectionInfo } from './connection-info.interface';

export interface IPOI extends Document {
  ID: number;
  UUID: string;
  DataProviderID: number;
  DataProvider: {
    WebsiteURL: string;
    Comments: string;
    DataProviderStatusType: {
      IsProviderEnabled: boolean;
      ID: number;
      Title: string;
    };
    IsRestrictedEdit: boolean;
    IsOpenDataLicensed: boolean;
    IsApprovedImport: boolean;
    License: string;
    DateLastImported: string;
    ID: number;
    Title: string;
  };
  OperatorID: number;
  OperatorInfo: {
    websiteURL: string;
    Comments: string;
    PhonePrimaryContact: string;
    PhoneSecondaryContact: string;
    IsPrivateIndividual: boolean;
    AddressInfo: string;
    BookingURL: string;
    ContactEmail: string;
    FaultReportEmail: string;
    IsRestrictedEdit: boolean;
    ID: number;
    Title: string;
  };
  UsageTypeID: number;
  UsageType: {
    IsPayAtLocation: boolean;
    IsMembershipRequired: boolean;
    IsAccessKeyRequired: boolean;
    ID: number;
    Title: string;
  };
  StatusType: {
    IsOperational: boolean;
    IsUserSelectable: boolean;
    ID: number;
    Title: string;
  };
  SubmissionStatus: {
    IsLive: boolean;
    ID: number;
    Title: string;
  };
  UserComments: UserComment[];
  PercentageSimilarity: number;
  MediaItems: string;
  IsRecentlyVerified: boolean;
  DateLastVerified: string;
  ParentChargePointID: number;
  DataProvidersReference: string;
  OperatorsReference: string;
  UsageCost: string;
  AddressInfo: IAddressInfo;
  Connections: IConnectionInfo[];
  NumberOfPoints: number;
  GeneralComments: string;
  DatePlanned: string;
  DateLastConfirmed: string;
  StatusTypeID: number;
  DateLastStatusUpdate: string;
  MetadataValues: Record<string, any>;
  DataQualityLevel: number;
  DateCreated: string;
  SubmissionStatusTypeID: number;
}
