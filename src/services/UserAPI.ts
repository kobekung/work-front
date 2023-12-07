import axios from "axios";
import { Component } from "react";
import { IUser } from "../interfaces/user.interface";
import { IPagination, IRowReturn } from "../interfaces/row.interface";
import { mockUsers } from "../mock/user.mock";

class UserApi extends Component {
  static GetAll: (data: IPagination) => Promise<IRowReturn<IUser>> = async (
    data: IPagination
  ) => {
    try {
      // const result = await axios({
      //   url: "/users/getAll",
      //   method: "post",
      //   data: data,
      // });

      // return result.data;
      return {
        currentPage: 1,
        totalPages: 1,
        totalCount: 2,
        data: mockUsers,
      };
    } catch (error) {
      throw error as Error;
    }
  };
  static Create: (data: IUser) => Promise<IUser> = async (data) => {
    try {
      // const result = await axios({
      //   url: "/users/create",
      //   method: "post",
      //   data: data,
      // });

      // return result.data;
      return mockUsers[0];
    } catch (error) {
      throw error as Error;
    }
  };
  static Update: (data: IUser) => Promise<IUser> = async (data) => {
    try {
      // const result = await axios({
      //   url: "/users/update",
      //   method: "put",
      //   data: data,
      // });

      // return result.data;
      return mockUsers[0];
    } catch (error) {
      throw error as Error;
    }
  };
  static Delete: (id: number) => Promise<IUser> = async (id) => {
    try {
      // const result = await axios({
      //   url: "/users/" + id,
      //   method: "delete",
      // });

      // return result.data;

      return mockUsers[0];
    } catch (error) {
      throw error as Error;
    }
  };
}

export { UserApi };
