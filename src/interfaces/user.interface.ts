import { IDefault } from "./default.interface";

export interface IUser extends IDefault {
  id: number;
  rankId?: number;
  rankAcm?: string; // rankAcm
  rankCode?: string;
  cdepCode?: string; //เหล่า ทบ, ทร, ทอ
  rankFull?: string;
  firstname: string;
  lastname: string;
  roleId: number;
  profile?: string;
  biogIdp: string;
  biogId?: string;
  unitId?: number;
  biogUnit?: string;
  biogUnitname?: string;
  email?: string;
  token?: string;
  refreshToken?: string;
  role?: IRole;
}

export interface IRole extends IDefault {
  Id?: number | null;
  Name?: string;
}
