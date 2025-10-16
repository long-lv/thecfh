import ThecfhDialog from "@/src/components/thecfhDialog";
import { IPropDetailCategory, modeFormCateogy } from "./type";
import ThecfhButton from "@/src/components/thecfhButton";
import { Box, Typography } from "@mui/material";
import { useEffect } from "react";
import ThecfhInput from "@/src/components/thecfhInput";
import ThecfhTextArea from "@/src/components/thecfhTextArea";

export default function DetailCategory(props: IPropDetailCategory) {
  const {
    mode = modeFormCateogy.VIEW,
    data,
    isOpen,
    onCancel,
    onSubmit,
  } = props;
  const handleSubmit = () => {
    console.log("submit");
  };

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

  const renderFooterDialog = () => {
    return (
      <div className="flex gap-3 py-5 px-3">
        <ThecfhButton
          label={isModeView? "Close" : "Cancel"}
          className="px-3 py-2 border rounded-sm w-[100px] hover:text-[var(--color-blue-cenematic)]"
          onClick={onCancel}
        ></ThecfhButton>
       {
				(isModeEdit || isModeCreate) ? 
				 <ThecfhButton
          label={isModeCreate ? "Create" : "Edit"}
          className="hover:opacity-[0.9] border rounded-sm w-[100px] bg-[var(--color-blue-cenematic)] text-white"
          onClick={handleSubmit}
        ></ThecfhButton> : <></>
			 }
      </div>
    );
  };

  useEffect(() => {
    console.log(isOpen, "isOpen");
  }, [isOpen]);
  return (
    <ThecfhDialog
      open={isOpen}
      title={renderTitle()}
      onClose={onCancel}
      onConfirm={handleSubmit}
      footer={renderFooterDialog()}
      isHiddenBorderBot
      isHiddenBorderTop
    >
      <div className="form flex flex-col gap-2.5">
				<ThecfhInput value={data?.name} disabled={isModeView} width="100%"></ThecfhInput>
				<ThecfhTextArea value={data?.description} disabled={isModeView} width="100%"></ThecfhTextArea>
			</div>
    </ThecfhDialog>
  );
}
