import { useEffect, useState } from "react";
import PageHeader from "../components/PageHeader";
import { IRowReturn } from "../interfaces/row.interface";
import TableProduct from "../components/Table/TableProduct";
import { IProduct } from "../interfaces/product.interface";
import { ProductAPI } from "../services/ProductAPI";
import { useNavigate, useParams } from "react-router-dom";
import SearchProduct from "../components/Search/SearchProduct";

const ProductPage = () => {
  const [products, setProducts] = useState<IRowReturn<IProduct> | null>();
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<IProduct | null>();
  const [row, setRow] = useState<number>(10);
  const { id } = useParams();
  const history = useNavigate();
  const getProducts = async () => {
    try {
      const result = await ProductAPI.GetAll({
        search: `projectId:${id};name:${search?.name};`,
        page: page,
        limit: row,
      });
      return setProducts(result);
    } catch (e) {
        history("/project");
      throw e;
    }
  };
  useEffect(() => {
    if (!id) {
      history(-1);
    }
    getProducts();
  }, [page, row]);

  useEffect(() => {
    getProducts();
  }, [search]);

  return (
    <div>
      <PageHeader Title={"Product"} subTitle={"All project"} />
      <SearchProduct setSearch={setSearch} />
      <TableProduct
        row={row}
        setRow={setRow}
        refreshTable={getProducts}
        data={products!}
        setPage={setPage}
      />
    </div>
  );
};

export default ProductPage;
