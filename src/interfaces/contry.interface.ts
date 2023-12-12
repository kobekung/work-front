import { IDefault } from "./default.interface";

export interface ICountry extends IDefault {
  id: number;
  name: string;
  code?: string;
  imgUrl?: string;
}
