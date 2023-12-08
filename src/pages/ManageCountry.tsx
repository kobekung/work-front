import { useEffect, useState } from "react";
import PageHeader from "../components/PageHeader";
import { IRowReturn } from "../interfaces/row.interface";
import { CountryApi } from "../services/CountryAPI";
import TableCountry from "../components/Table/TableCountry";
import { ICountry } from "../interfaces/contry.interface";

const ManageCountryPage = () => {
  const [countries, setCountries] = useState<IRowReturn<ICountry> | null>();
  const [page, setPage] = useState<number>(1);
  const [row, setRow] = useState<number>(10);
  const getCountry = async () => {
    try {
      const result = await CountryApi.GetAll({
        page: page,
        size: row,
      });
      return setCountries(result);
    } catch (e) {
      throw e;
    }
  };
  useEffect(() => {
    getCountry();
  }, [page, row]);

  return (
    <div>
      <PageHeader Title={"Setting"} subTitle={"Manage Country"} />
      <TableCountry
        row={row}
        setRow={setRow}
        refreshTable={getCountry}
        data={countries!}
        setPage={setPage}
      />
    </div>
  );
};

export default ManageCountryPage;
