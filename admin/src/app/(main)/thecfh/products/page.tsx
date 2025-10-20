"use client";
import ThecfhButton from "@/src/components/thecfhButton";
import ThecfhSearchBar from "@/src/components/thecfhSearchBar";
import ThecfhTable from "@/src/components/thecfhTable";
import { useProductsWithQuery } from "@/src/hooks/useProducts";
import { columns, defaulQuery } from "./constaint";
import { useEffect, useState } from "react";
import { IProduct } from "@/src/lib/type/products.type";
import { IPaginatorResponse } from "@/src/lib/type/api.type";
import {
	formatedDate,
  formatedPrice,
  PAGINATION_PAGE_DEFAULT,
  PAGINATION_SIZE_DEFAULT,
	splitImages,
} from "@/src/constants";
import { useGlobalToast } from "@/src/hooks/useGlobalToast";
import { useGlobalLoading } from "@/src/hooks/useGlobalLoading";
import ThecfhPaginator from "@/src/components/thecfhPaginator";
import Image from "next/image";
import TheCfhPhotoView from "@/src/components/ThecfhPhotoView";

export default function ProductsPage() {
  const { data, isError, isPending, isFetching, updateQuery } =
    useProductsWithQuery(defaulQuery);
  const toast = useGlobalToast();
  const loading = useGlobalLoading();
  const [listProduct, setListProduct] = useState<IProduct[]>([]);
  const [query, setQuery] = useState(defaulQuery);
  const [paginator, setPaginator] = useState<IPaginatorResponse>({
    total: 0,
    size: PAGINATION_SIZE_DEFAULT,
    page: PAGINATION_PAGE_DEFAULT,
    totalPage: 0,
  });

  const handlePageChange = (page: number) => {
    updateQuery({ page });
  };

  const handleRowsPerPageChange = (size: number) => {
    updateQuery({ size });
  };

  const columnsFormated = [
    ...columns.map((col) => {
      if (col.id === "name") {
        return {
          ...col,
          format: (_: unknown, row?: IProduct) => (
            <div className="cursor-pointer hover:text-[var(--color-blue-cenematic)]">
              {row?.name}
            </div>
          ),
        };
      }

      if (col.id === "price") {
        return {
          ...col,
          format: (_: unknown, row?: IProduct) => (
            <span>{row && row.price ? formatedPrice(row.price) : ""}</span>
          ),
        };
      }

      if (col.id === "imgUrl") {
        return {
          ...col,
          format: (_: unknown, row?: IProduct) => (
            <TheCfhPhotoView
              src={`${row && row.imgUrl?.length > 0 ? splitImages(row.imgUrl)[0] : ""}`}
              width={100}
              height={100}
              alt="product-img"
            />
          ),
        };
      }

			if (col.id === 'createdAt') {
				return {
					...col,
					format: (_:unknown, row?: IProduct) => (
						<div>{row?.createdAt ? formatedDate(row?.createdAt) : ""}</div>
					)
				}
			}
      return col;
    }),
  ];

  useEffect(() => {
    if (data?.data) setListProduct(data?.data);
    if (data?.meta) setPaginator(data?.meta);
  }, [data]);

  /** Manage global loading spinner during fetch */
  useEffect(() => {
    if (isPending) setListProduct([]);
    if (isFetching) loading.showLoading();
    else loading.hideLoading();
  }, [isPending, isFetching]);

  useEffect(() => {
    if (isError) {
      toast.error("Get product list failed, try again!");
    }
  }, [isError]);
  return (
    <div className="container">
      <div className="header flex justify-between items-center">
        <h4 className="text-2xl font-bold leading-[100%]">Products</h4>
        <div className="menu-header flex gap-2">
          <ThecfhSearchBar onSearch={() => console.log("search")} />
          <ThecfhButton
            className="w-[100px] h-[35px] px-3 py-2 bg-[var(--color-blue-cenematic)] rounded !mb-2 text-white flex items-center justify-center"
            label="Create"
            onClick={() => {
              console.log("on submit");
            }}
          />
        </div>
      </div>
      <main className="content">
        {/* Table */}
        <ThecfhTable data={listProduct} columns={columnsFormated}></ThecfhTable>
        {/* Paginator */}
        <ThecfhPaginator
          page={query.page}
          totalRows={paginator.total}
          rowsPerPage={query.size}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
        />
      </main>
    </div>
  );
}
