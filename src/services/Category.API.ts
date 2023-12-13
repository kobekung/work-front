import axios from "axios";
import { Component } from "react";
import { IPagination, IRowReturn } from "../interfaces/row.interface";
import { ICategory } from "../interfaces/category.interface";

class CategoryApi extends Component {
  static GetAll: (data: IPagination) => Promise<IRowReturn<ICategory>> = async (
    data: IPagination
  ) => {
    try {
      const result = await axios({
        url: "/product-category/findAll",
        method: "get",
        params: data,
      });

      return result.data;
    } catch (error) {
      throw error as Error;
    }
  };
  static Create: (data: ICategory) => Promise<ICategory> = async (data) => {
    try {
      const result = await axios({
        url: "/product-category/create",
        method: "post",
        data: data,
      });

      return result.data;
    } catch (error) {
      throw error as Error;
    }
  };
  static Update: (data: ICategory) => Promise<ICategory> = async (data) => {
    try {
      const result = await axios({
        url: "/product-category/update",
        method: "put",
        data: data,
      });
      return result.data;
    } catch (error) {
      throw error as Error;
    }
  };
  static Delete: (id: number) => Promise<ICategory> = async (id) => {
    try {
      const result = await axios({
        url: "/product-category/delete/" + id,
        method: "delete",
      });

      return result.data;
    } catch (error) {
      throw error as Error;
    }
  };
}

export { CategoryApi };
