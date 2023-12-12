import { IDefault } from "./default.interface";
import { IProductCountry } from "./product-country.interface";
import { IProject } from "./project.interface";

export interface IProduct extends IDefault {
  id: number;
  projectId: number;
  name: string;
  pricePerUnit?: number;
  quantity?: number;
  remark?: string;
  countryIds?: number[];

  project?: IProject;
  productCountry?: IProductCountry[];
}
