import axios from "axios";
import { Component } from "react";
import { ILogin } from "../pages/LoginPage";

class AuthenApi extends Component {
  static Login = async (data: ILogin) => {
    try {
      // const result = await axios({
      //   url: "/login",
      //   method: "post",
      //   data: data,
      // });

      // return result.data;
      return {
        token:"555"
      }
    } catch (error) {
      throw error as Error;
    }
  };
}

export { AuthenApi };
