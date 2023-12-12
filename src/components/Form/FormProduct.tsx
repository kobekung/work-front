import { Dispatch, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";

import _ from "lodash";
import { alertError, alertSuccess } from "../../utils/Alert";
import CustomDialog from "../Dialog/CustomDialog";
import ToggleSwitch from "../Input/ToggleSwitch";
import InputComponent from "../Input/InputComponent";
import { IProduct } from "../../interfaces/product.interface";
import { INPUT_TYPE_ENUM } from "../../enums/input.enum";
import { ProductAPI } from "../../services/ProductAPI";

interface IProp {
  data: IProduct | null;
  open: boolean;
  setOpen: Dispatch<boolean>;
  refreshTable: () => void;
}

const FormProduct = ({ data, open, setOpen, refreshTable }: IProp) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<IProduct>();
  const onSubmit = async (payload: IProduct) => {
    try {
      if (_.isEmpty(data) || _.isNil(data)) {
        await ProductAPI.Create(payload);
      } else {
        console.log(data);
        await ProductAPI.Update({ ...data, ...payload });
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
      reset({ id: undefined });
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
                ...register("name", { required: "Please Enter Data." }),
              }}
            />
            <InputComponent
              label={"quantity"}
              type={INPUT_TYPE_ENUM.NUMBER}
              register={{
                ...register("quantity", { required: "Please Enter Data." }),
              }}
            />
            <InputComponent
              label={"pricePerUnit"}
              type={INPUT_TYPE_ENUM.NUMBER}
              register={{
                ...register("pricePerUnit", { required: "Please Enter Data." }),
              }}
            />
            <InputComponent
              label={"Remark"}
              type={INPUT_TYPE_ENUM.TEXTAREA}
              register={{
                ...register("remark"),
              }}
            />

            <Controller
              name="status"
              control={control}
              render={() => (
                <ToggleSwitch label="Active" name="status" control={control} />
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

export default FormProduct;
