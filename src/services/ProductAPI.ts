import axios from "axios";
import { Component } from "react";
import { IPagination, IRowReturn } from "../interfaces/row.interface";
import { IProduct } from "../interfaces/product.interface";

class ProductAPI extends Component {
  static GetAll: (data: IPagination) => Promise<IRowReturn<IProduct>> = async (
    data: IPagination
  ) => {
    try {
      const result = await axios({
        url: "/product/findAll",
        method: "get",
        params: data,
      });

      return result.data;
    } catch (error) {
      throw error as Error;
    }
  };
  static Create: (data: IProduct) => Promise<IProduct> = async (data) => {
    try {
      const result = await axios({
        url: "/product/create",
        method: "post",
        data: data,
      });

      return result.data;
    } catch (error) {
      throw error as Error;
    }
  };
  static Update: (data: IProduct) => Promise<IProduct> = async (data) => {
    try {
      const result = await axios({
        url: "/product/update",
        method: "put",
        data: data,
      });
      return result.data;
    } catch (error) {
      throw error as Error;
    }
  };
  static Delete: (id: number) => Promise<IProduct> = async (id) => {
    try {
      const result = await axios({
        url: "/product/delete/" + id,
        method: "delete",
      });

      return result.data;
    } catch (error) {
      throw error as Error;
    }
  };
}

export { ProductAPI };
