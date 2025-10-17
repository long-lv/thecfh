"use client";

import SingleDropDownMenu from "@/src/components/singleDropDownMenu";
import ThecfhButton from "@/src/components/thecfhButton";
import ThecfhPaginator from "@/src/components/thecfhPaginator";
import ThecfhSearchBar from "@/src/components/thecfhSearchBar";
import ThecfhTable from "@/src/components/thecfhTable";
import {
  PAGINATION_PAGE_DEFAULT,
  PAGINATION_SIZE_DEFAULT,
} from "@/src/constants";
import { useCreateCategory, useDeleteCategory, useGetCategories, useUpdateCategory } from "@/src/hooks/useCategories";
import { useGlobalLoading } from "@/src/hooks/useGlobalLoading";
import { useGlobalToast } from "@/src/hooks/useGlobalToast";
import { IPaginatorResponse } from "@/src/lib/type/api.type";
import {
  ICategories,
  ICategoriesGetQuery,
} from "@/src/lib/type/categories.type";
import { useEffect, useState } from "react";
import DetailCategory from "./components/detailCategory";
import {
  modeFormCateogy,
  TReqDataCategory,
} from "./components/detailCategory/type";
import { columns, optionAction } from "./constant";

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
  const { data, isPending, isError, isFetching } = useGetCategories(query);

  const createdCategory = useCreateCategory();

	const updatedCate = useUpdateCategory();

	const deletedCate = useDeleteCategory();

	const isSubmitting = 
  createdCategory.isPending || 
  updatedCate.isPending || 
  deletedCate.isPending;

  /** [State] categories list */
  const [listCategories, setListCategories] = useState<ICategories[]>([]);

  const [selectedData, setSelectedData] = useState<ICategories | null>(null);

  const [mode, setMode] = useState(modeFormCateogy.VIEW);

  const [isOpenDialogDetail, setIsOpenDialogDetail] = useState(false);

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

  const getElementSelected = (id: number) => {
    return (
      listCategories.find((cate) => {
        return cate.id === id;
      }) ?? null
    );
  };

  const hanldeAction = (action: string, id: number) => {
    if (action.toLowerCase() === "edit") {
      handleClickEdit(id);
    } else {
      handleClickDelete(id);
    }
  };

  const handleClickEdit = (id: number) => {
    const elementSelected = getElementSelected(id);
    setSelectedData(elementSelected);
    setIsOpenDialogDetail(true);
    setMode(modeFormCateogy.EDIT);
  };

  const handleClickDelete = (id: number) => {
    console.log(id, "idElementSelectDelete");
  };

  const handleClickCateName = (id: number) => {
    setIsOpenDialogDetail(true);
    const elementSelected = getElementSelected(id);
    setSelectedData(elementSelected);
  };


	  const handleSearch = (keyword: string) => {
    setQuery((prev) => ({
      ...prev,
      keyword,
      page: PAGINATION_PAGE_DEFAULT,
    }));
  };

  const onCreateCate = (data: TReqDataCategory) => {
    loading.showLoading();
    createdCategory.mutate(data, {
      onSuccess: () => {
        toast.success("Create category success!");
        handleCloseDialogDetail();
      },
      onError: (error) => {
        toast.error(error.response?.data.message ?? "Error action");
      },
      onSettled: () => {
        loading.hideLoading();
      },
    });
  };

	const onEditCate = (data: TReqDataCategory) => {
		loading.showLoading();
		if (selectedData?.id) {
			updatedCate.mutate({id: selectedData.id, data}, {
				onSuccess: () => {
					toast.success('Update category success');
					handleCloseDialogDetail();
				},
				onError: (error) => {
					toast.error(error.response?.data.message ?? "Error action")
				},
				onSettled: () => {
					loading.hideLoading();
				}
			})
		}
	}
  const handleSubmit = (data: TReqDataCategory) => {
    if (mode === modeFormCateogy.CREATE) {
      onCreateCate(data);
    } 

		if (mode === modeFormCateogy.EDIT) {
			onEditCate(data);
		}
  };

  const handleCloseDialogDetail = () => {
    setIsOpenDialogDetail(false);
    setSelectedData(null);
    setMode(modeFormCateogy.VIEW);
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
          format: (_: unknown, row: ICategories) => {
            return (
              <div
                className="cursor-pointer hover:text-[var(--color-blue-cenematic)]"
                onClick={() => {
                  handleClickCateName(row.id);
                  setMode(modeFormCateogy.VIEW);
                }}
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
      format: (_: unknown, row?: ICategories) => {
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

  return (
    <div className="container">
      <div className="header-page flex justify-between !mb-4">
        <h4 className="text-2xl font-bold ledding-[100%]">Categories</h4>
        <div className="menu-header flex gap-2">
          <ThecfhSearchBar onSearch={handleSearch} />
          <ThecfhButton
            className="w-[100px] h-[35px] px-3 py-2 bg-[var(--color-blue-cenematic)] rounded !mb-2 text-white flex items-center justify-center"
            label="Create"
            onClick={() => {
              setIsOpenDialogDetail(true);
              setSelectedData(null);
              setMode(modeFormCateogy.CREATE);
            }}
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
        mode={mode}
				isSubmitting={isSubmitting}
        onCancel={handleCloseDialogDetail}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
