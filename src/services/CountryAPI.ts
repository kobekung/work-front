import axios from "axios";
import { Component } from "react";
import { IPagination, IRowReturn } from "../interfaces/row.interface";
import { ICountry } from "../interfaces/contry.interface";
import { mockCountry } from "../mock/country.mock";

class CountryApi extends Component {
  static GetAll: (data: IPagination) => Promise<IRowReturn<ICountry>> = async (
    data: IPagination
  ) => {
    try {
      const result = await axios({
        url: "/country/findAll",
        method: "get",
        params: data,
      });

      return result.data;
    } catch (error) {
      throw error as Error;
    }
  };
  static Create: (data: ICountry) => Promise<ICountry> = async (data) => {
    try {
      const result = await axios({
        url: "/country/create",
        method: "post",
        data: data,
      });

      return result.data;
    } catch (error) {
      throw error as Error;
    }
  };
  static Update: (data: ICountry) => Promise<ICountry> = async (data) => {
    try {
      const result = await axios({
        url: "/country/update",
        method: "put",
        data: data,
      });
      return result.data;
    } catch (error) {
      throw error as Error;
    }
  };
  static Delete: (id: number) => Promise<ICountry> = async (id) => {
    try {
      const result = await axios({
        url: "/country/delete/" + id,
        method: "delete",
      });

      return result.data;

      return mockCountry[0];
    } catch (error) {
      throw error as Error;
    }
  };
}

export { CountryApi };
