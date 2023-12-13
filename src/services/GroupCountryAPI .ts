import axios from "axios";
import { Component } from "react";
import { IPagination, IRowReturn } from "../interfaces/row.interface";
import { mockCountry } from "../mock/country.mock";
import { ICountryGroup } from "../interfaces/groupContry.interface";

class GroupCountryApi extends Component {
  static GetAll: (data: IPagination) => Promise<IRowReturn<ICountryGroup>> =
    async (data: IPagination) => {
      try {
        const result = await axios({
          url: "/country-group/findAll",
          method: "get",
          params: data,
        });

        return result.data;
      } catch (error) {
        throw error as Error;
      }
    };
  static Create: (data: ICountryGroup) => Promise<ICountryGroup> = async (
    data
  ) => {
    try {
      const result = await axios({
        url: "/country-group/create",
        method: "post",
        data: data,
      });

      return result.data;
    } catch (error) {
      throw error as Error;
    }
  };
  static Update: (data: ICountryGroup) => Promise<ICountryGroup> = async (
    data
  ) => {
    try {
      const result = await axios({
        url: "/country-group/update",
        method: "put",
        data: data,
      });
      return result.data;
    } catch (error) {
      throw error as Error;
    }
  };
  static Delete: (id: number) => Promise<ICountryGroup> = async (id) => {
    try {
      const result = await axios({
        url: "/country-group/delete/" + id,
        method: "delete",
      });

      return result.data;

      return mockCountry[0];
    } catch (error) {
      throw error as Error;
    }
  };
}

export { GroupCountryApi };
