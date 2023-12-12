import { Button, Input, InputRef, Pagination, Table, Tag } from "antd";
import { FaEdit, FaEye, FaSearch, FaTrashAlt } from "react-icons/fa";
import { useRef, useState } from "react";
import _ from "lodash";
import { IRowReturn } from "../../interfaces/row.interface";
import { alertConfirm, alertError, alertSuccess } from "../../utils/Alert";
import AddButton from "../Button/AddButton";
import { IProject } from "../../interfaces/project.interface";
import FormProject from "../Form/FormProject";
import { ProjectApi } from "../../services/ProjectAPI";
import { useNavigate } from "react-router-dom";

const TableProject = ({
  data,
  refreshTable,
  setPage,
  setRow,
  row,
}: {
  row: number;
  setRow: React.Dispatch<React.SetStateAction<number>>;
  data: IRowReturn<IProject>;
  refreshTable: () => void;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const [open, setOpen] = useState(false);
  const [dataSelected, setDataSelected] = useState<IProject | null>(null);
  const searchInput = useRef<InputRef>(null);
  const history = useNavigate();

  const handleEdit = async (data: IProject) => {
    // eslint-disable-next-line no-useless-catch
    try {
      setDataSelected(data);
      setOpen(true);
    } catch (e) {
      throw e;
    }
  };

  const handleDelete = async (data: IProject) => {
    try {
      const confirm = await alertConfirm("Are you sure?", "Delete");
      if (!confirm) return;
      await ProjectApi.Delete(data.id!);
      refreshTable();
      alertSuccess();
    } catch (e: any) {
      alertError(e.response.data.message);
      throw e;
    }
  };

  const handleAdd = async () => {
    // eslint-disable-next-line no-useless-catch
    try {
      await setDataSelected(null);
      setOpen(true);
    } catch (e) {
      throw e;
    }
  };

  type ColumnSearchProps = {
    dataIndex: string;
    handleSearch: (confirm: any) => void;
    handleReset: (clearFilters: any) => void;
  };

  const getColumnSearchProps = ({
    dataIndex,
    handleSearch,
    handleReset,
  }: ColumnSearchProps) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }: any) => (
      <div style={{ padding: 8 }}>
        <Input
          id="search-input"
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(confirm)}
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Button
          type="primary"
          onClick={() => handleSearch(confirm)}
          icon={<FaSearch />}
          className="bg-[#1677ff]"
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button
          onClick={() => handleReset(clearFilters)}
          size="small"
          style={{ width: 90 }}
        >
          Reset
        </Button>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <FaSearch style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value: any, record: any) => {
      // Handle nested properties
      const nestedProps = dataIndex.split(".");
      let valueToCheck = record;
      for (const prop of nestedProps) {
        valueToCheck = valueToCheck[prop];
      }
      return valueToCheck
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase());
    },
    onFilterDropdownOpenChange: (visible: boolean) => {
      if (visible) {
        if (visible) {
          setTimeout(() => searchInput.current?.select(), 100);
        }
      }
    },
    render: (text: string, record: IProject) => {
      // Custom rendering logic here
      return (
        <div key={record.id}>
          <p className="line-clamp-1">{text}</p>
        </div>
      );
    },
  });

  const handleSearch = (confirm: any) => {
    confirm();
  };

  const handleReset = (clearFilters: any) => {
    clearFilters();
  };

  const handleTableChange = (pagination: number, row: number) => {
    setPage(pagination);
    setRow(row);
  };

  const columns: any = [
    {
      title: "id",
      dataIndex: "id",
      key: "id",
      ...getColumnSearchProps({ dataIndex: "id", handleSearch, handleReset }),
    },
    {
      title: "name",
      dataIndex: "name",
      key: "id",
      ...getColumnSearchProps({
        dataIndex: "name",
        handleSearch,
        handleReset,
      }),
    },
    {
      title: "Active",
      dataIndex: "status",
      key: "status",
      render: (_: number, row: IProject) => {
        return (
          <div key={`active-${row.id}`}>
            <Tag color={row.status ? "green" : "volcano"}>
              {row.status ? "Connect" : "Disable"}
            </Tag>
          </div>
        );
      },
    },
    {
      title: "",
      dataIndex: "id",
      key: "id",
      render: (_: number, data: IProject) => (
        <div className="flex gap-5" key={`actions-${data.id}`}>
          <div
            className="cursor-pointer text-xl text-blue-500"
            onClick={() => history("/product/" + data.id)}
          >
            <FaEye />
          </div>
          <div
            className="cursor-pointer text-xl text-amber-500"
            onClick={() => handleEdit(data)}
          >
            <FaEdit />
          </div>
          <div
            className="cursor-pointer text-xl text-red-500"
            onClick={() => handleDelete(data)}
          >
            <FaTrashAlt />
          </div>
        </div>
      ),
    },
  ];
  return (
    <div className="shadow-md rounded-md flex flex-col gap-5 px-4">
      <div className="flex justify-end">
        <AddButton onClick={handleAdd} />
      </div>
      <div className="overflow-x-auto">
        <Table
          pagination={false}
          dataSource={data?.data ?? []}
          columns={columns}
          rowKey="id"
        />
        <Pagination
          current={!_.isEmpty(data) ? data.page : 0}
          total={data?.total ?? 0}
          pageSize={row ?? 10} // Adjust the pageSize as needed
          onChange={handleTableChange}
        />
      </div>
      <FormProject
        refreshTable={refreshTable}
        data={dataSelected}
        open={open}
        setOpen={setOpen}
      />
    </div>
  );
};

export default TableProject;
