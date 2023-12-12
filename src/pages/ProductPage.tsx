import { useEffect, useState } from "react";
import PageHeader from "../components/PageHeader";
import { IRowReturn } from "../interfaces/row.interface";
import TableProduct from "../components/Table/TableProduct";
import { IProduct } from "../interfaces/product.interface";
import { ProductAPI } from "../services/ProductAPI";
import { useNavigate, useParams } from "react-router-dom";
import SearchProduct from "../components/Search/SearchProduct";
import { CountryApi } from "../services/CountryAPI";
import { ICountry } from "../interfaces/contry.interface";

const ProductPage = () => {
  const [products, setProducts] = useState<IRowReturn<IProduct> | null>();
  const [countries, setCountries] = useState<IRowReturn<ICountry> | null>();
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<IProduct | null>();
  const [row, setRow] = useState<number>(10);
  const { id } = useParams();
  const history = useNavigate();
  const getProducts = async () => {
    try {
      const result = await ProductAPI.GetAll({
        search: `projectId:${id};name:${search?.name ?? ""};`,
        page: page,
        limit: row,
      });
      return setProducts(result);
    } catch (e) {
      history("/project");
      throw e;
    }
  };

  const getCountry = async () => {
    const result = await CountryApi.GetAll({
      page: 1,
      limit: 1000,
    });
    return setCountries(result);
  };
  useEffect(() => {
    if (!id) {
      history(-1);
    }
    getProducts();
  }, [page, row]);

  useEffect(() => {
    getProducts();
    setPage(1);
    setRow(10);
  }, [search]);

  useEffect(() => {
    getCountry();
  }, []);

  return (
    <div>
      <PageHeader Title={"Product"} subTitle={"All project"} />
      <SearchProduct setSearch={setSearch} />
      <TableProduct
        countries={countries ? countries.data! : []}
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
