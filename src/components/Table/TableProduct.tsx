import { Button, Input, InputRef, Pagination, Table, Tag } from "antd";
import { FaEdit, FaSearch, FaTrashAlt } from "react-icons/fa";
import { useRef, useState } from "react";
import _ from "lodash";
import { IRowReturn } from "../../interfaces/row.interface";
import { alertConfirm, alertError, alertSuccess } from "../../utils/Alert";
import AddButton from "../Button/AddButton";
import { IProduct } from "../../interfaces/product.interface";
import FormProduct from "../Form/FormProduct";
import { ProductAPI } from "../../services/ProductAPI";
import { ICountry } from "../../interfaces/contry.interface";

const TableProduct = ({
  countries,
  data,
  refreshTable,
  setPage,
  setRow,
  row,
}: {
  countries: ICountry[];
  row: number;
  setRow: React.Dispatch<React.SetStateAction<number>>;
  data: IRowReturn<IProduct>;
  refreshTable: () => void;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const [open, setOpen] = useState(false);
  const [dataSelected, setDataSelected] = useState<IProduct | null>(null);
  const searchInput = useRef<InputRef>(null);

  const handleEdit = async (data: IProduct) => {
    try {
      setDataSelected(data);
      setOpen(true);
    } catch (e) {
      throw e;
    }
  };

  const handleDelete = async (data: IProduct) => {
    try {
      const confirm = await alertConfirm("Are you sure?", "Delete");
      if (!confirm) return;
      await ProductAPI.Delete(data.id!);
      refreshTable();
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
    render: (text: string, record: IProduct) => {
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
      title: "Name",
      dataIndex: "name",
      key: "id",
      ...getColumnSearchProps({
        dataIndex: "name",
        handleSearch,
        handleReset,
      }),
    },

    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "id",
      ...getColumnSearchProps({
        dataIndex: "quantity",
        handleSearch,
        handleReset,
      }),
    },
    {
      title: "PricePerUnit",
      dataIndex: "pricePerUnit",
      key: "id",
      ...getColumnSearchProps({
        dataIndex: "pricePerUnit",
        handleSearch,
        handleReset,
      }),
    },
    {
      title: "Active",
      dataIndex: "status",
      key: "status",
      render: (_: number, row: IProduct) => {
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
      render: (_: number, data: IProduct) => (
        <div className="flex gap-5" key={`actions-${data.id}`}>
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
      <FormProduct
        countries={countries}
        refreshTable={refreshTable}
        data={dataSelected}
        open={open}
        setOpen={setOpen}
      />
    </div>
  );
};

export default TableProduct;
