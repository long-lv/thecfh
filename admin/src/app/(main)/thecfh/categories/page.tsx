"use client";

import ThecfhButton from "@/src/components/thecfhButton";
import ThecfhPaginator from "@/src/components/thecfhPaginator";
import ThecfhTable from "@/src/components/thecfhTable";
import {
  PAGINATION_PAGE_DEFAULT,
  PAGINATION_SIZE_DEFAULT,
} from "@/src/constants";
import { useGetCategories } from "@/src/hooks/useCategories";
import { useGlobalLoading } from "@/src/hooks/useGlobalLoading";
import { useGlobalToast } from "@/src/hooks/useGlobalToast";
import { IPaginatorResponse } from "@/src/lib/type/api.type";
import {
  ICategoiresGetQuery,
  ICategories
} from "@/src/lib/type/categories.type";
import { useEffect, useState } from "react";
import { columns } from "./constant";

export default function Categories() {
  /** [Hook] Toast message */
  const toast = useGlobalToast();
  /** [Hook] Loading  */
  const loading = useGlobalLoading();

  /** [State] query */
  const [query, setQuery] = useState<ICategoiresGetQuery>({
    keyword: "",
    order: "",
    page: PAGINATION_PAGE_DEFAULT,
    size: PAGINATION_SIZE_DEFAULT,
  });

  /** [Hook] useGetCategoriesList */
  const { data, isLoading, isError } = useGetCategories(query);

  /** [State] categories list */
  const [dataCategories, setDataCategories] = useState<ICategories[]>([]);

  /** [State] paginator */
  const [paginator, setPaginator] = useState<IPaginatorResponse>({
    total: null,
    size: PAGINATION_SIZE_DEFAULT,
    page: PAGINATION_PAGE_DEFAULT,
    totalPage: null,
  });

	const handlePageChange = (page: number) => {
    setQuery((prev) => ({
      ...prev,
      page,
    }));
  };

	const handleRowsPerPageChange = (newRowsPerPage: number) => {
		setQuery((prev) => ({
      ...prev,
      size: newRowsPerPage,
      page: PAGINATION_PAGE_DEFAULT
    }));
  };

	const handleClickEdit = (id: number) => {
		console.log(id, 'id edit');
	} 

	const handleClickDelete = (id: number) => {
		console.log(id, 'id delete');
	}

	const columsFomat = [
		...columns,
		{
			id: 'action',
			label: 'action',
			format: (_, row?: ICategories) => {
				if (!row) return null;
				return (
					<div className="flex gap-1">
						<ThecfhButton label="Edit" onClick={() => handleClickEdit(row.id)}></ThecfhButton>
						<ThecfhButton label="Delete" onClick={() => handleClickDelete(row.id)}></ThecfhButton>
					</div>
				);
			}
		}
	]

  useEffect(() => {
    if (data?.data) {
      setDataCategories(data.data);
    }

    if (data?.meta) {
      setPaginator(data.meta);
    }
  }, [data]);

  useEffect(() => {
    if (isLoading) {
      setDataCategories([]);
    }
  }, [isLoading]);

  useEffect(() => {
    if (isError) {
      toast.error("get categories false");
    }
    if (isLoading) {
      loading.showLoading();
    } else {
      loading.hideLoading();
    }
  }, [isError, isLoading]);

  return (
    <div className="container">
      <ThecfhTable
        columns={columsFomat}
        data={dataCategories}
        loading={isLoading}
        isError={isError}
        errorMessage="An error, try again!"
      ></ThecfhTable>
      <ThecfhPaginator
        page={query.page}
        rowsPerPage={query.size}
        totalRows={Number(paginator.total)}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
      ></ThecfhPaginator>
    </div>
  );
}
