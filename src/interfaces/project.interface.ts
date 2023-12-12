import { IDefault } from "./default.interface";
import { IProduct } from "./product.interface";

export interface IProject extends IDefault {
    id: number;
    name: string;
    budget?: number;

    product: IProduct[];
}

