"use client";

import SearchButton from "@/src/components/searchButton";
import ThecfhInput from "@/src/components/thecfhInput";
import { memo, useEffect, useRef, useState } from "react";

interface ISearchBarProps {
	placeholder?: string;
  onSearch: (keyword: string) => void;
  debounceTime?: number; // ms, default 500ms
}

const ThecfhSearchBar = memo(({ onSearch, placeholder = "Search", debounceTime = 500 }: ISearchBarProps) => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
    };
  }, []);

  const handleChange = (value: string) => {
    setSearchKeyword(value);

    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }
    debounceTimeoutRef.current = setTimeout(() => {
      const cleanedValue = value.replace(/\s+/g, ' ').trim();
      onSearch(cleanedValue);
    }, debounceTime);
  };

  const handleSearch = () => {
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }
    const cleanedValue = searchKeyword.replace(/\s+/g, ' ').trim();
    onSearch(cleanedValue);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <>
      <ThecfhInput
        value={searchKeyword}
        placeholder={placeholder}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      <SearchButton onClick={handleSearch} />
    </>
  );
});

ThecfhSearchBar.displayName = "ThecfhSearchBar";

export default ThecfhSearchBar;

