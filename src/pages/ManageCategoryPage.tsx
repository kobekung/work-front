import { useEffect, useState } from "react";
import PageHeader from "../components/PageHeader";
import { IRowReturn } from "../interfaces/row.interface";

import { ICategory } from "../interfaces/category.interface";
import TableCategory from "../components/Table/TableCategory";
import { CategoryApi } from "../services/Category.API";

const ManageCategoryPage = () => {
  const [categories, setCategories] = useState<IRowReturn<ICategory> | null>();
  const [page, setPage] = useState<number>(1);
  const [row, setRow] = useState<number>(10);
  const getCategory = async () => {
    try {
      const result = await CategoryApi.GetAll({
        page: page,
        limit: row,
      });
      return setCategories(result);
    } catch (e) {
      throw e;
    }
  };
  useEffect(() => {
    getCategory();
  }, [page, row]);

  return (
    <div>
      <PageHeader Title={"Setting"} subTitle={"Manage Category"} />
      <TableCategory
        row={row}
        setRow={setRow}
        refreshTable={getCategory}
        data={categories!}
        setPage={setPage}
      />
    </div>
  );
};

export default ManageCategoryPage;
