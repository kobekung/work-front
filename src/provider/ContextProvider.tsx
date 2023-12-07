import React from "react";
import { SiteContext } from "../context/Context";
import { jwtDecode } from "jwt-decode";

interface MyProviderProps {
  children: React.ReactNode;
}

export interface IDecodetoken {
  exp: 0;
  iat: 0;
  role: 0;
  userId: 0;
  username: string;
}

export const ContextProvider: React.FC<MyProviderProps> = ({ children }) => {
  const [count, setCount] = React.useState<number>(0);

  const decodedJWT = async () => {
    const jwtToken = localStorage.getItem("token");
    if (!jwtToken) return;
    const decodedToken: IDecodetoken = jwtDecode(jwtToken ?? "");
  };

  return (
    <SiteContext.Provider value={{ setCount, count }}>
      {children}
    </SiteContext.Provider>
  );
};
