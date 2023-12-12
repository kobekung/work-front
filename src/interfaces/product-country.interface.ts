import { ICountry } from "./contry.interface";
import { IProduct } from "./product.interface";

export interface IProductCountry {
  id: number;
  productId: number;
  countryId: number;

  product: IProduct;
  country: ICountry;
}
