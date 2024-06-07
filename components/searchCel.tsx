"use client";
import React, { useEffect, useRef, useState } from "react";
import { Input } from "./ui/input";
import { useRouter } from "next/navigation";
import { useDebounce } from "use-debounce";
import { LuSearch } from "react-icons/lu";

const SearchCel = ({ search }: { search?: string }) => {
  const [text, setText] = useState(search);
  const [query] = useDebounce(text, 300);
  const router = useRouter();

  const initialRender = useRef(true);
  //console.log("Query:", query);
  //console.log("initialRender.current", initialRender.current);

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }

    if (!query) router.push(`/cellules`);
    else router.push(`/cellules?search=${query}`);
  }, [router, query]);

  return (
    <div className="relative">
      <Input
        placeholder="Rechercher une cellule ..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="rounded-lg bg-gradient-to-l from-orange-200/80 to-transparent"
      />
      <LuSearch className="absolute top-0 right-0 text-neutral-300" size={40} />
    </div>
  );
};
export default SearchCel;
