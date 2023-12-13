import axios from "axios";
import { Component } from "react";

class UserApi extends Component {
  static Search: (data: string) => Promise<any> = async (data: string) => {
    try {
      const result = await axios({
        url: "/rdp/search-person-by-name",
        method: "get",
        data: data,
      });

      return result.data;
    } catch (error) {
      throw error as Error;
    }
  };
}

export { UserApi };
