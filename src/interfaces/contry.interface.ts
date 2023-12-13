import { IDefault } from "./default.interface";
import { ICountryGroup } from "./groupContry.interface";

export interface ICountry extends IDefault {
  id: number;
  name: string;
  code?: string;
  imgUrl?: string;
  groupId?: number;
  countryGroup?: ICountryGroup;
}
