import axios from "axios";
import { Component } from "react";
import { IPagination, IRowReturn } from "../interfaces/row.interface";
import { IProject } from "../interfaces/project.interface";
import { mockCountry } from "../mock/country.mock";

class ProjectApi extends Component {
  static GetAll: (data: IPagination) => Promise<IRowReturn<IProject>> = async (
    data: IPagination
  ) => {
    try {
      const result = await axios({
        url: "/project/findAll",
        method: "get",
        params: data,
      });

      return result.data;
    } catch (error) {
      throw error as Error;
    }
  };
  static Create: (data: IProject) => Promise<IProject> = async (data) => {
    try {
      const result = await axios({
        url: "/project/create",
        method: "post",
        data: data,
      });

      return result.data;
    } catch (error) {
      throw error as Error;
    }
  };
  static Update: (data: IProject) => Promise<IProject> = async (data) => {
    try {
      const result = await axios({
        url: "/project/update",
        method: "put",
        data: data,
      });
      return result.data;
    } catch (error) {
      throw error as Error;
    }
  };
  static Delete: (id: number) => Promise<IProject> = async (id) => {
    try {
      const result = await axios({
        url: "/project/delete/" + id,
        method: "delete",
      });

      return result.data;

      return mockCountry[0];
    } catch (error) {
      throw error as Error;
    }
  };
}

export { ProjectApi };
