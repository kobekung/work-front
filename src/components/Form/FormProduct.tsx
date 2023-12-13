import { Dispatch, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";

import _ from "lodash";
import { alertError, alertSuccess } from "../../utils/Alert";
import CustomDialog from "../Dialog/CustomDialog";
import ToggleSwitch from "../Input/ToggleSwitch";
import InputComponent from "../Input/InputComponent";
import { IProduct } from "../../interfaces/product.interface";
import { INPUT_TYPE_ENUM } from "../../enums/input.enum";
import { ProductAPI } from "../../services/ProductAPI";
import { useParams } from "react-router-dom";
import MultipleSelect from "../Input/MultipleSelect";
import { ICountry } from "../../interfaces/contry.interface";
import ComboboxInput from "../Input/ComboboxInput";
import { CategoryApi } from "../../services/Category.API";
import { ICategory } from "../../interfaces/category.interface";

interface IProp {
  data: IProduct | null;
  open: boolean;
  setOpen: Dispatch<boolean>;
  refreshTable: () => void;
  countries: ICountry[];
}

const FormProduct = ({
  data,
  open,
  setOpen,
  refreshTable,
  countries,
}: IProp) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
    reset,
  } = useForm<IProduct>();
  const { id } = useParams();
  const [categories, setCategories] = useState<ICategory[]>([]);
  const onSubmit = async (payload: IProduct) => {
    try {
      if (_.isEmpty(data) || _.isNil(data)) {
        await ProductAPI.Create({ ...payload, projectId: Number(id) });
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

  const getCategory = async () => {
    const result = await CategoryApi.GetAll({
      limit: 100,
      page: 1,
    });
    setCategories(result.data);
  };

  useEffect(() => {
    if (data) {
      reset({ ...data } ?? {});
      setValue(
        "countryIds",
        data!.productCountry!.map((item) => item.countryId)
      );
    } else {
      reset({ id: undefined });
    }
  }, [data, setOpen]);
  useEffect(() => {
    getCategory();
  }, []);

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
            <ComboboxInput
              errors={errors.categoryId?.message}
              defaultValue={data?.categoryId}
              name="categoryId"
              label="Category"
              control={control}
              dataSelect={categories.map((e: ICategory) => {
                return {
                  id: e.id,
                  name: e.name,
                  value: e.id,
                  unavailable: false,
                };
              })}
            />
            <InputComponent
              label={"quantity"}
              type={INPUT_TYPE_ENUM.NUMBER}
              defaultValue={0}
              register={{
                ...register("quantity", { required: "Please Enter Data." }),
              }}
            />
            <InputComponent
              label={"pricePerUnit"}
              defaultValue={0}
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
            <div className="flex flex-col gap-2">
              <p className="font-semibold">Country</p>
              <MultipleSelect
                control={control}
                options={countries.map((item) => {
                  return { value: item.id.toString(), label: item.name };
                })}
                name={"countryIds"}
              />
            </div>

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
