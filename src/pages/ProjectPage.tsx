import { useEffect, useState } from "react";
import PageHeader from "../components/PageHeader";
import { IRowReturn } from "../interfaces/row.interface";
import { IProject } from "../interfaces/project.interface";
import { ProjectApi } from "../services/ProjectAPI";
import TableProject from "../components/Table/TableProject";

const ProjectPage = () => {
  const [projects, setProjects] = useState<IRowReturn<IProject> | null>();
  const [page, setPage] = useState<number>(1);
  const [row, setRow] = useState<number>(10);
  const getProjects = async () => {
    // eslint-disable-next-line no-useless-catch
    try {
      const result = await ProjectApi.GetAll({
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
      <TableProject
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
