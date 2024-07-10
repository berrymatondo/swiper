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

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }

    if (!query) router.push(`/cellules`);
    else router.push(`/cellules?search=${query}`);
  }, [router, query]);

  return (
    <div className="relative w-full">
      <LuSearch className="absolute top-0 left-0 text-neutral-300" size={40} />
      <Input
        placeholder="       Rechercher une cellule d'Impact"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="rounded-full bg-gradient-to-l from-orange-200/80 to-transparent"
      />
    </div>
  );
};
export default SearchCel;
