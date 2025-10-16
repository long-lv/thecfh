"use client";

import SingleDropDownMenu from "@/src/components/SingleDropDownMenu";
import { useState } from "react";

export default function Categories() {
  const optionsList = [
    {
      value: "1",
      label: "Edit",
    },
    {
      value: "2",
      label: "Delete",
    },
  ];

  const handleChangeValue = (val: string) => {
    setValueChange(val);
  };
	const [valueChange, setValueChange] = useState('');
  return (
    <div>
      <SingleDropDownMenu
				width="100px"
				isMoreIcon
        options={optionsList}
        onChangeValue={handleChangeValue}
				value={valueChange}
      />
    </div>
  );
}
