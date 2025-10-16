"use client";

import SingleDropDownMenu from "@/src/components/singleDropDownMenu";
import ThecfhPaginator from "@/src/components/thecfhPaginator";
import ThecfhTable from "@/src/components/thecfhTable";
import {
  PAGINATION_PAGE_DEFAULT,
  PAGINATION_SIZE_DEFAULT,
} from "@/src/constants";
import {
  useGetCategories,
  useGetCategoryBydId,
} from "@/src/hooks/useCategories";
import { useGlobalLoading } from "@/src/hooks/useGlobalLoading";
import { useGlobalToast } from "@/src/hooks/useGlobalToast";
import { IPaginatorResponse } from "@/src/lib/type/api.type";
import {
  ICategories,
  ICategoriesGetQuery,
} from "@/src/lib/type/categories.type";
import { useEffect, useState } from "react";
import DetailCategory from "./components/detailCategory";
import { modeFormCateogy } from "./components/detailCategory/type";
import { columns, optionAction } from "./constant";
import ThecfhInput from "@/src/components/thecfhInput";
import SearchButton from "@/src/components/searchButton";
import ThecfhButton from "@/src/components/thecfhButton";

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
  const { data, isPending, isError, isSuccess, isFetching, refetch } =
    useGetCategories(query);

  /** [State] categories list */
  const [listCategories, setListCategories] = useState<ICategories[]>([]);

  const [selectedData, setSelectedData] = useState<ICategories | null>(null);

  /** [State] paginator */
  const [paginator, setPaginator] = useState<IPaginatorResponse>({
    total: 0,
    size: PAGINATION_SIZE_DEFAULT,
    page: PAGINATION_PAGE_DEFAULT,
    totalPage: 0,
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
      page: PAGINATION_PAGE_DEFAULT,
    }));
  };

  const hanldeAction = (action: string, id: number) => {
    if (action.toLowerCase() === "edit") {
      handleClickEdit(id);
    } else {
      handleClickDelete(id);
    }
  };

  const handleClickEdit = (id: number) => {
    console.log(id, "idElementSelectEdit");
  };

  const handleClickDelete = (id: number) => {
    console.log(id, "idElementSelectDelete");
  };

  const handleClickCateName = (id: number) => {
    setIsOpenDialogDetail(true);
    const elementSelected =
      listCategories.find((cate) => {
        return cate.id === id;
      }) ?? null;
    setSelectedData(elementSelected);
  };
  const renderAction = (id: number) => {
    return (
      <div className="flex gap-1">
        <SingleDropDownMenu
          isMoreIcon={true}
          options={optionAction}
          onChangeValue={(val) => {
            hanldeAction(val, id);
          }}
          width="120px"
        />
      </div>
    );
  };
  const columsFomat = [
    ...columns.map((col) => {
      if (col.id === "name") {
        return {
          ...col,
          format: (_, row: ICategories) => {
            return (
              <div
                className="cursor-pointer hover:text-[var(--color-blue-cenematic)]"
                onClick={() => handleClickCateName(row.id)}
              >
                {row?.name}
              </div>
            );
          },
        };
      }
      return col;
    }),
    {
      id: "action",
      label: "Action",
      format: (_, row?: ICategories) => {
        if (!row) return null;
        return renderAction(row.id);
      },
    },
  ];

  useEffect(() => {
    if (data?.data) {
      setListCategories(data.data);
    }

    if (data?.meta) {
      setPaginator(data.meta);
    }
  }, [data]);

  useEffect(() => {
    if (isPending) {
      setListCategories([]);
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

  const [isOpenDialogDetail, setIsOpenDialogDetail] = useState(false);
  return (
    <div className="container">
      <div className="header-page flex justify-between !mb-4">
        <h4 className="text-2xl font-bold ledding-[100%]">Categories</h4>
        <div className="menu-header flex gap-2">
          <ThecfhInput value="" placeholder="Search" />
          <SearchButton />
          <ThecfhButton
            className="w-[100px] h-[35px] px-3 py-2 bg-[var(--color-blue-cenematic)] rounded !mb-2 text-white flex items-center justify-center"
            label="Create"
          />
        </div>
      </div>
      <div className="flex justify-end"></div>
      <ThecfhTable
        columns={columsFomat}
        data={listCategories}
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
      <DetailCategory
        isOpen={isOpenDialogDetail}
        data={selectedData}
        mode={modeFormCateogy.VIEW}
        onCancel={() => setIsOpenDialogDetail(false)}
        onSubmit={(data) => console.log(data)}
      />
    </div>
  );
}
