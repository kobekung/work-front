import { useForm } from "react-hook-form";
import { IProduct } from "../../interfaces/product.interface";
import InputComponent from "../Input/InputComponent";
import { Dispatch, useEffect, useState } from "react";
import { ICategory } from "../../interfaces/category.interface";
import { CategoryApi } from "../../services/Category.API";
import ComboboxInput from "../Input/ComboboxInput";

const SearchProduct = ({ setSearch }: { setSearch: Dispatch<IProduct> }) => {
  const { register, handleSubmit, control, reset } = useForm<IProduct>();
  const [categories, setCategories] = useState<ICategory[]>([]);

  const getCategory = async () => {
    const result = await CategoryApi.GetAll({
      limit: 100,
      page: 1,
    });
    setCategories(result.data);
  };

  const onSubmit = async (payload: IProduct) => {
    try {
      setSearch(payload);
    } catch (e: any) {
      throw e;
    }
  };

  useEffect(() => {
    getCategory();
  }, []);
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex">
        <div className="flex  gap-3">
          <InputComponent
            label={"Name"}
            register={{
              ...register("name"),
            }}
          />
          <ComboboxInput
            name="categoryId"
            required={false}
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
          <div className=" flex justify-center items-end">
            <button
              type="submit"
              className=" h-1/2  mr-3 inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500"
            >
              Search
            </button>
            <button
              onClick={() => {
                reset();
              }}
              type="button"
              className="h-1/2  mr-3 inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500"
            >
              Clear
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SearchProduct;
