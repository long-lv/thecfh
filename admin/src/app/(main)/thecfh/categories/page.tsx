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
  ICategoriesGetQuery,
  ICategories
} from "@/src/lib/type/categories.type";
import { useEffect, useState } from "react";
import { columns } from "./constant";
import Image from "next/image";
import actionIcon from "@/src/assets/images/action_icon.svg"
import SingleSelectionDropDown from "@/src/components/Dropdown";

export default function Categories() {
  /** [Hook] Toast message */
  const toast = useGlobalToast();
  /** [Hook] Loading  */
  const loading = useGlobalLoading();

  /** [State] query */
  const [query, setQuery] = useState<ICategoriesGetQuery>({
    keyword: "",
    order: "",
    page: PAGINATION_PAGE_DEFAULT,
    size: PAGINATION_SIZE_DEFAULT,
  });

  /** [Hook] useGetCategoriesList */
  const { data, isPending, isError, isSuccess, isFetching, refetch } = useGetCategories(query);

  /** [State] categories list */
  const [dataCategories, setDataCategories] = useState<ICategories[]>([]);

  /** [State] paginator */
  const [paginator, setPaginator] = useState<IPaginatorResponse>({
    total: 0,
    size: PAGINATION_SIZE_DEFAULT,
    page: PAGINATION_PAGE_DEFAULT,
    totalPage: 0,
  });

	const [isOpenMenuAction, setIsOpenMenuAction] = useState(false);

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

	const renderAction = () => {
		return (
			<div className="flex gap-1">
				<Image className="cursor-pointer" src={actionIcon} width={20} height={20} alt="action_icon" onClick={() => setIsOpenMenuAction(!isOpenMenuAction)}/>
			</div>
		)
	}
	const columsFomat = [
		...columns,
		{
			id: 'action',
			label: 'action',
			format: (_, row?: ICategories) => {
				if (!row) return null;
				return (
					renderAction()
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
    if (isPending) {
      setDataCategories([]);
    }
		if (isFetching) {
      loading.showLoading();
    } else {
      loading.hideLoading();
    }
  }, [isPending, isFetching]);

  useEffect(() => {
    if (isError) {
      toast.error("get categories false");
    }
  }, [isError]);

  return (
    <div className="container">
      <ThecfhTable
        columns={columsFomat}
        data={dataCategories}
        loading={isFetching || isPending}
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
