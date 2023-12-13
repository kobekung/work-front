import axios from "axios";
import { Component } from "react";
import { IUser } from "../interfaces/user.interface";

interface RdpApiInterface {
  name: string;
  token: string;
}
class RdpApi extends Component {
  static Search: (data: RdpApiInterface) => Promise<IUser[]> = async (
    data: RdpApiInterface
  ) => {
    try {
      const result = await axios({
        url: "/rdp/search-person-by-name",
        method: "post",
        data: data,
      });

      return result.data;
    } catch (error) {
      throw error as Error;
    }
  };
}

export { RdpApi };
