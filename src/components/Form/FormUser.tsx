import { Dispatch, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";

import _ from "lodash";
import { IRole, IUser } from "../../interfaces/user.interface";
import { UserApi } from "../../services/UserAPI";
import { alertError, alertSuccess } from "../../utils/Alert";
import CustomDialog from "../Dialog/CustomDialog";
import { INPUT_TYPE_ENUM } from "../../enums/input.enum";
import { mockRoles } from "../../mock/user.mock";
import ToggleSwitch from "../Input/ToggleSwitch";
import ComboboxInput from "../Input/ComboboxInput";
import InputComponent from "../Input/InputComponent";


interface IProp {
  data: IUser | null;
  open: boolean;
  setOpen: Dispatch<boolean>;
  getUser: () => void;
}

const FormUser = ({ data, open, setOpen, getUser }: IProp) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<IUser>();
  const onSubmit = async (payload: IUser) => {
    try {
      if (_.isEmpty(data) || _.isNil(data)) {
        await UserApi.Create(payload);
      } else {
        await UserApi.Update({ ...data, ...payload });
      }
      setOpen(false);
      getUser();
      alertSuccess();
    } catch (e: any) {
      alertError(e.response.data.message);
      throw e;
    }
  };


  useEffect(() => {
    if (data) {
      reset(data ?? {});
    } else {
      reset({ Id: undefined });
    }
  }, [data, setOpen]);

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
            {data?.Id && (
              <InputComponent
                label={"id"}
                register={{
                  ...register("Id", { required: "Please Enter Data." }),
                }}
                readonly={true}
              />
            )}
            <InputComponent
              label={"Username"}
              register={{
                ...register("Username", { required: "Please Enter Data." }),
              }}
            />
            {_.isEmpty(data) && (
              <InputComponent
                label={"Password"}
                type={INPUT_TYPE_ENUM.PASSWORD}
                register={{
                  ...register("Password", { required: "Please Enter Data." }),
                }}
              />
            )}

            <ComboboxInput
              errors={errors.RoleId?.message}
              defaultValue={data?.RoleId}
              name="role_id"
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
            <Controller
              name="IsActive"
              control={control}
              render={() => (
                <ToggleSwitch label="Active" name="IsActive" control={control} />
              )}
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
