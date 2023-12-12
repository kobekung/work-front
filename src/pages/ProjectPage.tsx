import { useEffect, useState } from "react";
import PageHeader from "../components/PageHeader";
import { IRowReturn } from "../interfaces/row.interface";
import { CountryApi } from "../services/CountryAPI";
import TableCountry from "../components/Table/TableCountry";
import { ICountry } from "../interfaces/contry.interface";

const ProjectPage = () => {
  const [projects, setProjects] = useState<IRowReturn<ICountry> | null>();
  const [page, setPage] = useState<number>(1);
  const [row, setRow] = useState<number>(10);
  const getProjects= async () => {
    try {
      const result = await CountryApi.GetAll({
        page: page,
        limit: row,
      });
      return setProjects(result);
    } catch (e) {
      throw e;
    }
  };
  useEffect(() => {
    getProjects();
  }, [page, row]);

  return (
    <div>
      <PageHeader Title={"Project"} subTitle={"All project"} />
      <TableCountry
        row={row}
        setRow={setRow}
        refreshTable={getProjects}
        data={projects!}
        setPage={setPage}
      />
    </div>
  );
};

export default ProjectPage;
