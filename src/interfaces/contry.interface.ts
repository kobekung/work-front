import { IDefault } from "./default.interface";

export interface ICountry extends IDefault {
  Id?: number;
  Name?: string;
  ImgUrl?: string;
}
