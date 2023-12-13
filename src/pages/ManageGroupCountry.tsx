import { useEffect, useState } from "react";
import PageHeader from "../components/PageHeader";
import { IRowReturn } from "../interfaces/row.interface";

import TableGroupCountry from "../components/Table/TableGroupCountry";
import { ICountryGroup } from "../interfaces/groupContry.interface";
import { GroupCountryApi } from "../services/GroupCountryAPI ";

const ManageGroupCountryPage = () => {
  const [page, setPage] = useState<number>(1);
  const [row, setRow] = useState<number>(10);
  const [countries, setCountries] =
    useState<IRowReturn<ICountryGroup> | null>();

  const getCountry = async () => {
    try {
      const result = await GroupCountryApi.GetAll({
        page: page,
        limit: row,
      });

      setCountries(result);
    } catch (e) {
      throw e;
    }
  };
  useEffect(() => {
    getCountry();
  }, [page, row]);

  return (
    <div>
      <PageHeader Title={"Setting"} subTitle={"Manage Group Country"} />
      <TableGroupCountry
        row={row}
        setRow={setRow}
        refreshTable={getCountry}
        data={countries!}
        setPage={setPage}
      />
    </div>
  );
};

export default ManageGroupCountryPage;
