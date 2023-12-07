import { IDefault } from "./default.interface";

export interface IUser extends IDefault {
  Id?: number | null;
  Username: string;
  Password: string;
  Role: IRole;
  RoleId: number;
}

export interface IRole extends IDefault {
  Id?: number | null;
  Name?: string;
}
