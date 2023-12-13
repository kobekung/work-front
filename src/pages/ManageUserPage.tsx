import { useEffect, useState } from "react";
import PageHeader from "../components/PageHeader";
import { UserApi } from "../services/UserAPI";
import { IUser } from "../interfaces/user.interface";
import { IRowReturn } from "../interfaces/row.interface";
import TableUser from "../components/Table/TableUser";
import { useSelector } from "react-redux";
import { initialState } from "../redux/redux.store";
import { ERole } from "../enums/role.enum";

const ManageUserPage = () => {
  const user = useSelector<initialState>(
    (state: initialState) => state.user
  ) as IUser;
  const [users, setusers] = useState<IRowReturn<IUser> | null>();
  const [page, setPage] = useState<number>(1);
  const [row, setRow] = useState<number>(10);
  const getUser = async () => {
    try {
      const result = await UserApi.GetAll({
        search: `${
          user.roleId != ERole.ADMIN ? `unitId:${user.biogUnit}` : ""
        }`,
        page: 1,
        limit: 1000,
      });
      return setusers(result);
    } catch (e) {
      throw e;
    }
  };
  useEffect(() => {
    getUser();
  }, [page, row]);

  return (
    <div>
      <PageHeader Title={"Setting"} subTitle={"Manage User"} />
      <TableUser
        row={row}
        setRow={setRow}
        getUser={getUser}
        data={users!}
        setPage={setPage}
      />
    </div>
  );
};

export default ManageUserPage;
