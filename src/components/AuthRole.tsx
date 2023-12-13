import { ReactElement, useEffect } from "react";
import { useSelector } from "react-redux";
import { initialState } from "../redux/redux.store";
import { Navigate } from "react-router-dom";
import { ERole } from "../enums/role.enum";
import { IUser } from "../interfaces/user.interface";

const AuthRole = ({ children }: { children: ReactElement }) => {
  const user = useSelector<initialState>(
    (state: initialState) => state.user
  ) as IUser;
  if (!user) {
    return <Navigate to="/dashboard" replace />;
  }
  if (ERole.ADMIN != user.roleId) {
    return <Navigate to="/dashboard" replace />;
  }
  return <div>{children}</div>;
};

export default AuthRole;
