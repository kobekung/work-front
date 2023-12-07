import { IRole, IUser } from "../interfaces/user.interface";

export const mockRoles: IRole[] = [
  {
    Id: 1,
    Name: "Admin",
    CreateDate: new Date(),
    UpdateDate: new Date(),
  },
  {
    Id: 2,
    Name: "User",
    CreateDate: new Date(),
    UpdateDate: new Date(),
  },
];

export const mockUsers: IUser[] = [
  {
    Id: 1,
    Username: "adminUser",
    Password: "adminPass",
    Role: mockRoles[0],
    RoleId: 1,
    CreateDate: new Date(),
    UpdateDate: new Date(),
    IsActive: true,
  },
  {
    Id: 2,
    Username: "regularUser",
    Password: "adminPass",
    Role: mockRoles[1],
    RoleId: 2,
    CreateDate: new Date(),
    UpdateDate: new Date(),
    IsActive: true,
  },
];
