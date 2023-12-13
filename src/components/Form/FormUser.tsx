import { Dispatch, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";

import _, { set } from "lodash";
import { IRole, IUser } from "../../interfaces/user.interface";
import { UserApi } from "../../services/UserAPI";
import { alertError, alertSuccess } from "../../utils/Alert";
import CustomDialog from "../Dialog/CustomDialog";
import { INPUT_TYPE_ENUM } from "../../enums/input.enum";
import { mockRoles } from "../../mock/user.mock";
import ToggleSwitch from "../Input/ToggleSwitch";
import ComboboxInput from "../Input/ComboboxInput";
import InputComponent from "../Input/InputComponent";
import ComboboxBase from "../Input/ComboboxBase";

interface IProp {
  data: IUser | null;
  open: boolean;
  setOpen: Dispatch<boolean>;
  getUser: () => void;
}

const FormUser = ({ data, open, setOpen, getUser }: IProp) => {
  const [search, setSearch] = useState<string>("");
  const [users, setUsers] = useState<any[]>([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<{ username: string; roleId: number }>();
  const onSubmit = async (payload: { username: string; roleId: number }) => {
    try {
      // if (_.isEmpty(data) || _.isNil(data)) {
      //   await UserApi.Create(payload);
      // } else {
      //   await UserApi.Update({ ...data, ...payload });
      // }
      setOpen(false);
      getUser();
      alertSuccess();
    } catch (e: any) {
      alertError(e.response.data.message);
      throw e;
    }
  };

  const searchUser = async () => {
    try {
      const result = await UserApi.GetAll({
        limit: 100,
        page: 1,
        search: search,
      });
      setUsers(result.data);
    } catch (e) {
      throw e;
    }
  };

  useEffect(() => {
    if (data) {
      reset(data ?? {});
    } else {
      reset({ username: undefined });
    }
  }, [data, setOpen]);

  useEffect(() => {}, [search]);

  return (
    <div>
      <CustomDialog
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        title={"User"}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-2">
            <Controller
              name={"username"}
              rules={{ required: "please select data" }}
              control={control}
              render={({ field: { onChange, value } }) => {
                return (
                  <ComboboxBase
                    onSearchChange={(e) => {
                      setSearch(e);
                    }}
                    disable={false}
                    dataset={users ?? []}
                    defaultValue={value}
                    onChange={(e) => {
                      console.log(e);
                    }}
                  />
                );
              }}
            />

            <ComboboxInput
              errors={errors.roleId?.message}
              defaultValue={data?.roleId}
              name="roleId"
              label="Role"
              control={control}
              dataSelect={mockRoles.map((e: IRole) => {
                return {
                  id: e.Id,
                  name: e.Name,
                  value: e.Id,
                  unavailable: false,
                };
              })}
            />

            <div className="mt-4 flex justify-center">
              <button
                type="submit"
                className="mr-3 inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500"
              >
                Save
              </button>
            </div>
          </div>
        </form>
      </CustomDialog>
    </div>
  );
};

export default FormUser;
