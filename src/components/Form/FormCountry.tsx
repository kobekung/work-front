import { Dispatch, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";

import _ from "lodash";
import { alertError, alertSuccess } from "../../utils/Alert";
import CustomDialog from "../Dialog/CustomDialog";
import ToggleSwitch from "../Input/ToggleSwitch";
import InputComponent from "../Input/InputComponent";
import { ICountry } from "../../interfaces/contry.interface";
import { CountryApi } from "../../services/CountryAPI";
import PreviewImage from "../Input/PreviewImage";

interface IProp {
  data: ICountry | null;
  open: boolean;
  setOpen: Dispatch<boolean>;
  refreshTable: () => void;
}

const FormCountry = ({ data, open, setOpen, refreshTable }: IProp) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<ICountry>();
  const onSubmit = async (payload: ICountry) => {
    try {
      if (_.isEmpty(data) || _.isNil(data)) {
        await CountryApi.Create(payload);
      } else {
        console.log(data);
        await CountryApi.Update({ ...data, ...payload });
      }
      setOpen(false);
      refreshTable();
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
        title={"Country"}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-3">
            <InputComponent
              label={"Name"}
              register={{
                ...register("Name", { required: "Please Enter Data." }),
              }}
            />
            <div className=" flex flex-col gap-2">
              <label className="block text-sm font-medium text-gray-700">
                Image
              </label>
              <div className="flex justify-center">
                <PreviewImage register={register("ImgUrl")} />
              </div>
            </div>

            <Controller
              name="IsActive"
              control={control}
              render={() => (
                <ToggleSwitch
                  label="Active"
                  name="IsActive"
                  control={control}
                />
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

export default FormCountry;
