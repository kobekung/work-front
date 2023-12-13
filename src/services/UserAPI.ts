import axios from "axios";
import { Component } from "react";
import { IUser } from "../interfaces/user.interface";
import { IPagination, IRowReturn } from "../interfaces/row.interface";

class UserApi extends Component {
  static GetAll: (data: IPagination) => Promise<IRowReturn<IUser>> = async (
    data: IPagination
  ) => {
    try {
      const result = await axios({
        url: "/user/findAll",
        method: "get",
        params: data,
      });

      return result.data;
    } catch (error) {
      throw error as Error;
    }
  };

  static Create: (data: IUser) => Promise<IUser> = async (data) => {
    try {
      const result = await axios({
        url: "/user/create",
        method: "post",
        data: data,
      });

      return result.data;
    } catch (error) {
      throw error as Error;
    }
  };
  static Update: (data: IUser) => Promise<IUser> = async (data) => {
    try {
      const result = await axios({
        url: "/user/update/" + data.id,
        method: "put",
        data: data,
      });

      return result.data;
    } catch (error) {
      throw error as Error;
    }
  };
  static Delete: (id: number) => Promise<IUser> = async (id) => {
    try {
      const result = await axios({
        url: "/user/delete/" + id,
        method: "delete",
      });

      return result.data;
    } catch (error) {
      throw error as Error;
    }
  };
}

export { UserApi };
