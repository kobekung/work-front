import { Button, Input, InputRef, Pagination, Table, Tag } from "antd";
import { FaEdit, FaSearch, FaTrashAlt } from "react-icons/fa";
import { useRef, useState } from "react";
import _ from "lodash";
import { IUser } from "../../interfaces/user.interface";
import { IRowReturn } from "../../interfaces/row.interface";
import { alertConfirm, alertError, alertSuccess } from "../../utils/Alert";
import { UserApi } from "../../services/UserAPI";
import AddButton from "../Button/AddButton";
import FormUser from "../Form/FormUser";
import { mockRoles } from "../../mock/user.mock";
import { useSelector } from "react-redux";
import { initialState } from "../../redux/redux.store";
import { ERole } from "../../enums/role.enum";

const TableUser = ({
  data,
  getUser,
  setPage,
  setRow,
  row,
}: {
  row: number;
  setRow: React.Dispatch<React.SetStateAction<number>>;
  data: IRowReturn<IUser>;
  getUser: () => void;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const [open, setOpen] = useState(false);
  const [dataSelected, setDataSelected] = useState<IUser | null>(null);
  const searchInput = useRef<InputRef>(null);
  const user = useSelector<initialState>(
    (state: initialState) => state.user
  ) as IUser;
  const handleEdit = async (data: IUser) => {
    try {
      setDataSelected(data);
      setOpen(true);
    } catch (e) {
      throw e;
    }
  };

  const handleDelete = async (data: IUser) => {
    try {
      const confirm = await alertConfirm("Are you sure?", "Delete");
      if (!confirm) return;
      await UserApi.Delete(data.id!);
      getUser();
      alertSuccess();
    } catch (e: any) {
      alertError(e.response.data.message);
      throw e;
    }
  };

  const handleAdd = async () => {
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
    render: (text: string, record: IUser) => {
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
      title: "Id",
      dataIndex: "id",
      key: "id",
      ...getColumnSearchProps({ dataIndex: "id", handleSearch, handleReset }),
    },
    {
      title: "firstname",
      dataIndex: "firstname",
      key: "firstname",
      ...getColumnSearchProps({
        dataIndex: "firstname",
        handleSearch,
        handleReset,
      }),
    },
    {
      title: "lastname",
      dataIndex: "lastname",
      key: "lastname",
      ...getColumnSearchProps({
        dataIndex: "lastname",
        handleSearch,
        handleReset,
      }),
    },
    {
      title: "Unit",
      dataIndex: "biogUnitname",
      key: "biogUnitname",
      ...getColumnSearchProps({
        dataIndex: "biogUnitname",
        handleSearch,
        handleReset,
      }),
    },
    {
      title: "Role",
      dataIndex: "Role",
      key: "Role",
      render: (_: number, row: IUser) => {
        return (
          <div key={`active-${row.id}`}>
            <p>
              {
                mockRoles.find((e) => {
                  return e.Id == row.roleId;
                })?.Name
              }
            </p>
          </div>
        );
      },
    },
    {
      title: "Active",
      dataIndex: "status",
      key: "status",
      render: (_: number, row: IUser) => {
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
      dataIndex: "Id",
      key: "Id",
      render: (_: number, data: IUser) => (
        <div className="flex gap-5" key={`actions-${data.id}`}>
          {user.roleId == ERole.ADMIN || user.biogUnit == data.biogUnit ? (
            <>
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
            </>
          ) : (
            <></>
          )}
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
          // rowKey="id"
        />
        <Pagination
          current={!_.isEmpty(data) ? data.page : 0}
          total={data?.total ?? 0}
          pageSize={row ?? 10} // Adjust the pageSize as needed
          onChange={handleTableChange}
        />
      </div>
      <FormUser
        getUser={getUser}
        data={dataSelected}
        open={open}
        setOpen={setOpen}
      />
    </div>
  );
};

export default TableUser;
