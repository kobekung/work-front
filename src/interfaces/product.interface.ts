import { ICategory } from "./category.interface";
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
  categoryId?: number;

  project?: IProject;
  productCountry?: IProductCountry[];
  category?: ICategory;
}
