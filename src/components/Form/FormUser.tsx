import { Dispatch, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";

import _, { set } from "lodash";
import { IRole, IUser } from "../../interfaces/user.interface";
import { UserApi } from "../../services/UserAPI";
import { alertError, alertSuccess } from "../../utils/Alert";
import CustomDialog from "../Dialog/CustomDialog";
import { mockRoles } from "../../mock/user.mock";
import ComboboxInput from "../Input/ComboboxInput";
import ComboboxBase from "../Input/ComboboxBase";
import { RdpApi } from "../../services/RdpAPI";
import { initialState } from "../../redux/redux.store";
import { useSelector } from "react-redux";
import ComboboxUser from "../Input/ComboboxUser";

interface IProp {
  data: IUser | null;
  open: boolean;
  setOpen: Dispatch<boolean>;
  getUser: () => void;
}

const FormUser = ({ data, open, setOpen, getUser }: IProp) => {
  const user: any = useSelector<initialState>(
    (state: initialState) => state.user
  );
  const [search, setSearch] = useState<string>("");
  const [users, setUsers] = useState<any[]>([]);
  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<{ user: IUser; roleId: number }>();
  const onSubmit = async (payload: { user: IUser; roleId: number }) => {
    try {
      if (_.isEmpty(data) || _.isNil(data)) {
        const newPayload = {
          firstname: payload.user.biogName?.split("  ")[0] ?? "",
          lastname: payload.user.biogName?.split("  ")[1] ?? "",
          roleId: payload.roleId,
          biogIdp: payload.user.biogIdp,
          biogId: payload.user.biogId,
          unitId: payload.user.biogUnit,
          biogUnit: payload.user.biogUnit,
          biogUnitname: payload.user.biogUnitname,
          email: payload.user.biogName,
        } as IUser;
        await UserApi.Create(newPayload);
      } else {
        await UserApi.Update({
          roleId: payload.roleId,
          id: data.id,
        });
      }
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
      const result = await RdpApi.Search({
        name: search,
        token: user.token,
      });
      setUsers(result);
    } catch (e) {
      throw e;
    }
  };

  useEffect(() => {
    if (data) {
      reset(data ?? {});
    } else {
      reset({ user: undefined });
    }
  }, [data, setOpen]);

  useEffect(() => {
    if (search.length > 0) searchUser();
  }, [search]);

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
            {data ? (
              ""
            ) : (
              <Controller
                name={"user"}
                rules={{ required: "please select data" }}
                control={control}
                render={({ field: { onChange, value } }) => {
                  return (
                    <ComboboxUser
                      onSearchChange={(e) => {
                        setSearch(e);
                      }}
                      disable={false}
                      dataset={
                        users.map((e) => {
                          return {
                            id: e.biogIdp,
                            name: e.biogName,
                            value: e,
                            unavailable: false,
                          };
                        }) ?? []
                      }
                      onChange={(e) => {
                        onChange(e);
                      }}
                    />
                  );
                }}
              />
            )}

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
