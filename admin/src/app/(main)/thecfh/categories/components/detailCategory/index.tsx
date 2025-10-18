import ThecfhDialog from "@/src/components/thecfhDialog";
import { IPropDetailCategory, modeFormCateogy } from "./type";
import ThecfhButton from "@/src/components/thecfhButton";
import { useEffect } from "react";
import ThecfhInput from "@/src/components/thecfhInput";
import ThecfhTextArea from "@/src/components/thecfhTextArea";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { categorySchema, TYCategorySchema } from "./schema";

const defaultData = {
  name: "",
  description: "",
};
export default function DetailCategory(props: IPropDetailCategory) {
  const {
    mode = modeFormCateogy.VIEW,
    data,
    isOpen,
		isSubmitting,
    onCancel,
    onSubmit,
  } = props;

  const {
    control,
    handleSubmit,
    reset,
  } = useForm<TYCategorySchema>({
    resolver: yupResolver(categorySchema),
    mode: "onBlur",
    defaultValues: defaultData,
  });

  const isModeView = mode === modeFormCateogy.VIEW;
  const isModeEdit = mode === modeFormCateogy.EDIT;
  const isModeCreate = mode === modeFormCateogy.CREATE;

  const renderTitle = () => {
    switch (mode) {
      case modeFormCateogy.CREATE:
        return "Create category";
      case modeFormCateogy.EDIT:
        return "Update category";
      case modeFormCateogy.VIEW:
        return "Detail category";
    }
  };

  const handleSubmitAction = (data: TYCategorySchema) => {
    onSubmit(data);
  };

  const handleClose = () => {
    reset(defaultData);
    onCancel();
  };

  const renderFooterDialog = () => {
    return (
      <div className="flex gap-3 py-5 px-3">
        <ThecfhButton
          label={isModeView ? "Close" : "Cancel"}
          className="px-3 py-2 border rounded-sm w-[100px] hover:text-[var(--color-blue-cenematic)]"
          onClick={() => handleClose()}
        ></ThecfhButton>
        {isModeEdit || isModeCreate ? (
          <ThecfhButton
            label={isModeCreate ? "Create" : "Edit"}
						disabled={isSubmitting}
            className="hover:opacity-[0.9] border rounded-sm w-[100px] bg-[var(--color-blue-cenematic)] text-white"
            onClick={handleSubmit(handleSubmitAction)}
          ></ThecfhButton>
        ) : (
          <></>
        )}
      </div>
    );
  };

  useEffect(() => {
    if (data) {
      reset({
				name: data.name,
				description: data.description
			});
    } else if (isOpen && mode === modeFormCateogy.CREATE) {
      reset(defaultData);
    }
  }, [data, mode, isOpen, reset]);

	useEffect(() => {
		if (!isOpen) {
			reset(defaultData);
		}
	}, [isOpen, reset])

  return (
    <ThecfhDialog
      open={isOpen}
      title={renderTitle()}
      onClose={() => handleClose()}
      footer={renderFooterDialog()}
      isHiddenBorderBot
      isHiddenBorderTop
    >
      <div className="form flex flex-col gap-2.5">
        <Controller
          name="name"
          control={control}
          defaultValue=""
          render={({ field, fieldState }) => {
            return (
              <ThecfhInput
                {...field}
                disabled={isModeView}
                width="100%"
                placeholder="Category name..."
                error={fieldState.error?.message}
              ></ThecfhInput>
            );
          }}
        />
        <Controller
          name="description"
          control={control}
          defaultValue=""
          render={({ field, fieldState }) => {
            return (
              <ThecfhTextArea
                {...field}
                disabled={isModeView}
                width="100%"
                placeholder="Description..."
                error={fieldState.error?.message}
              ></ThecfhTextArea>
            );
          }}
        />
      </div>
    </ThecfhDialog>
  );
}
