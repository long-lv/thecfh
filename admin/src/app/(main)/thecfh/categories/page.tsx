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
import {
  useCreateCategory,
  useDeleteCategory,
  useGetCategories,
  useUpdateCategory,
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
import {
  modeFormCateogy,
  TReqDataCategory,
} from "./components/detailCategory/type";
import {
  columns,
  MESSAGE_ERROR_ACTION_DEFAULT,
  optionAction,
} from "./constant";
import DialogConfirmAction from "@/src/components/confirmAction";

/**
 * Categories Page Component
 *
 * This component provides a full CRUD interface for managing categories.
 * It supports:
 * - Listing and pagination
 * - Searching
 * - Creating, editing, and deleting categories
 * - Inline detail and confirmation dialogs
 */
export default function Categories() {
  /** Toast handler hook */
  const toast = useGlobalToast();

  /** Global loading handler hook */
  const loading = useGlobalLoading();

  /** Query parameters for fetching category list */
  const [query, setQuery] = useState<ICategoriesGetQuery>({
    keyword: "",
    order: "",
    page: PAGINATION_PAGE_DEFAULT,
    size: PAGINATION_SIZE_DEFAULT,
  });

  /** Category list query hook */
  const { data, isPending, isError, isFetching } = useGetCategories(query);

  /** Mutation hooks for CRUD actions */
  const createdCategory = useCreateCategory();
  const updatedCate = useUpdateCategory();
  const deletedCate = useDeleteCategory();

  /** Track if any mutation is currently submitting */
  const isSubmitting =
    createdCategory.isPending || updatedCate.isPending || deletedCate.isPending;

  /** Local state for category data and selection */
  const [listCategories, setListCategories] = useState<ICategories[]>([]);
  const [selectedData, setSelectedData] = useState<ICategories | null>(null);
  const [mode, setMode] = useState(modeFormCateogy.VIEW);

  /** Dialog control states */
  const [isOpenDialogDetail, setIsOpenDialogDetail] = useState(false);
  const [isOpenDialogConfirmAction, setIsOpenDialogConfirmAction] =
    useState(false);

  /** Dialog content and pending data for confirmation */
  const [contentDialogConfirmAction, setContentDialogConfirmAction] =
    useState("");
  const [pendingData, setPendingData] = useState<TReqDataCategory>({
    name: "",
    description: "",
  });

  /** Pagination state */
  const [paginator, setPaginator] = useState<IPaginatorResponse>({
    total: 0,
    size: PAGINATION_SIZE_DEFAULT,
    page: PAGINATION_PAGE_DEFAULT,
    totalPage: 0,
  });

  /**
   * Handle pagination page change
   * @param page - new page number
   */
  const handlePageChange = (page: number) => {
    setQuery((prev) => ({
      ...prev,
      page,
    }));
  };

  /**
   * Handle rows per page change
   * @param newRowsPerPage - new rows per page value
   */
  const handleRowsPerPageChange = (newRowsPerPage: number) => {
    setQuery((prev) => ({
      ...prev,
      size: newRowsPerPage,
      page: PAGINATION_PAGE_DEFAULT,
    }));
  };

  /**
   * Get a category object by its ID
   * @param id - category ID
   * @returns selected category or null
   */
  const getElementSelected = (id: number) => {
    return (
      listCategories.find((cate) => cate.id === id) ?? null
    );
  };

  /**
   * Handle category action (Edit or Delete)
   * @param action - selected action name
   * @param id - category ID
   */
  const handleAction = (action: modeFormCateogy, id: number) => {
    const elementSelected = getElementSelected(id);
    setSelectedData(elementSelected);
    switch (action) {
      case modeFormCateogy.EDIT:
        setIsOpenDialogDetail(true);
        setMode(modeFormCateogy.EDIT);
        break;

      case modeFormCateogy.DELETE:
        setMode(modeFormCateogy.DELETE);
        setContentDialogConfirmAction(
          `Do you delete category named: ${elementSelected?.name}`
        );
        setIsOpenDialogConfirmAction(true);
        break;
    }
  };

  /**
   * Handle click on category name — open detail view
   * @param id - category ID
   */
  const handleClickCateName = (id: number) => {
    setIsOpenDialogDetail(true);
    const elementSelected = getElementSelected(id);
    setSelectedData(elementSelected);
  };

  /** Close detail dialog and reset state */
  const handleCloseDialogDetail = () => {
    setIsOpenDialogDetail(false);
    setSelectedData(null);
    setMode(modeFormCateogy.VIEW);
  };

  /**
   * Handle submit event from detail dialog
   * @param data - category form data
   */
  const handleSubmitDetailCategory = (data: TReqDataCategory) => {
    if (mode === modeFormCateogy.CREATE) {
      onCreateCate(data);
    }

    if (mode === modeFormCateogy.EDIT) {
      setContentDialogConfirmAction(
        `Do you update category named: ${selectedData?.name}?`
      );
      setPendingData(data);
      setIsOpenDialogConfirmAction(true);
    }
  };

  /** Handle confirm action from confirmation dialog */
  const onSubmitDialogConfirmAction = () => {
    if (mode === modeFormCateogy.EDIT && selectedData?.id) {
      onEditCate(pendingData);
      setIsOpenDialogConfirmAction(false);
    }

    if (mode === modeFormCateogy.DELETE && selectedData?.id) {
      onDeleteCate(selectedData.id);
    }
  };

  /**
   * Handle search query submission
   * @param keyword - search keyword
   */
  const handleSearch = (keyword: string) => {
    setQuery((prev) => ({
      ...prev,
      keyword,
      page: PAGINATION_PAGE_DEFAULT,
    }));
  };

  /**
   * Create new category
   * @param data - new category data
   */
  const onCreateCate = (data: TReqDataCategory) => {
    loading.showLoading();
    createdCategory.mutate(data, {
      onSuccess: () => {
        toast.success("Create category success!");
        handleCloseDialogDetail();
      },
      onError: (error) => {
        toast.error(
          error.response?.data.message ?? MESSAGE_ERROR_ACTION_DEFAULT
        );
      },
      onSettled: () => {
        loading.hideLoading();
      },
    });
  };

  /**
   * Update existing category
   * @param data - updated category data
   */
  const onEditCate = (data: TReqDataCategory) => {
    loading.showLoading();
    if (selectedData?.id) {
      updatedCate.mutate(
        { id: selectedData.id, data },
        {
          onSuccess: () => {
            toast.success("Update category success");
            handleCloseDialogDetail();
          },
          onError: (error) => {
            toast.error(
              error.response?.data.message ?? MESSAGE_ERROR_ACTION_DEFAULT
            );
          },
          onSettled: () => {
            loading.hideLoading();
          },
        }
      );
    }
  };

  /**
   * Delete category by ID
   * @param id - category ID
   */
  const onDeleteCate = (id: number) => {
    loading.showLoading();
    deletedCate.mutate(id, {
      onSuccess: () => {
        toast.success("Delete success");
        setIsOpenDialogConfirmAction(false);
      },
      onError: (error) => {
        toast.error(
          error.response?.data.message ?? MESSAGE_ERROR_ACTION_DEFAULT
        );
      },
      onSettled: () => {
        loading.hideLoading();
      },
    });
  };

  /**
   * Render action dropdown for each row
   * @param id - category ID
   */
  const renderAction = (id: number) => {
    return (
      <div className="flex gap-1">
        <SingleDropDownMenu
          isMoreIcon={true}
          options={optionAction}
          onChangeValue={(val) => {
						const mode = Number(val) as modeFormCateogy;
            setMode(mode);
            handleAction(mode, id);
          }}
          width="120px"
        />
      </div>
    );
  };

  /** Build table column definitions with action and name formatting */
  const columsFomat = [
    ...columns.map((col) => {
      if (col.id === "name") {
        return {
          ...col,
          format: (_: unknown, row: ICategories) => (
            <div
              className="cursor-pointer hover:text-[var(--color-blue-cenematic)]"
              onClick={() => {
                handleClickCateName(row.id);
                setMode(modeFormCateogy.VIEW);
              }}
            >
              {row?.name}
            </div>
          ),
        };
      }
      return col;
    }),
    {
      id: "action",
      label: "Action",
      format: (_: unknown, row?: ICategories) =>
        row ? renderAction(row.id) : null,
    },
  ];

  /** Sync API response data with local state */
  useEffect(() => {
    if (data?.data) setListCategories(data.data);
    if (data?.meta) setPaginator(data.meta);
  }, [data]);

  /** Manage global loading spinner during fetch */
  useEffect(() => {
    if (isPending) setListCategories([]);
    if (isFetching) loading.showLoading();
    else loading.hideLoading();
  }, [isPending, isFetching]);

  /** Handle API error */
  useEffect(() => {
    if (isError) {
      toast.error("Get categories failed");
    }
  }, [isError]);

  /** Render */
  return (
    <div className="container">
      {/* Header */}
      <div className="header-page flex justify-between !mb-4">
        <h4 className="text-2xl font-bold leading-[100%]">Categories</h4>
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

      {/* Table */}
      <ThecfhTable
        columns={columsFomat}
        data={listCategories}
        loading={isFetching || isPending}
        isError={isError}
        errorMessage="An error occurred, try again!"
      />

      {/* Paginator */}
      <ThecfhPaginator
        page={query.page}
        rowsPerPage={query.size}
        totalRows={Number(paginator.total)}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
      />

      {/* Detail Dialog */}
      <DetailCategory
        isOpen={isOpenDialogDetail}
        data={selectedData}
        mode={mode}
        isSubmitting={isSubmitting}
        onCancel={handleCloseDialogDetail}
        onSubmit={handleSubmitDetailCategory}
      />

      {/* Confirm Dialog */}
      <DialogConfirmAction
        isOpen={isOpenDialogConfirmAction}
        onCancel={() => setIsOpenDialogConfirmAction(false)}
        onOke={onSubmitDialogConfirmAction}
        content={contentDialogConfirmAction}
      />
    </div>
  );
}
