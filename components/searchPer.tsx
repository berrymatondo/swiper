"use client";
import React, { useEffect, useRef, useState } from "react";
import { Input } from "./ui/input";
import { useRouter } from "next/navigation";
import { useDebounce } from "use-debounce";

const SearchPer = ({ search }: { search?: string }) => {
  const [text, setText] = useState(search);
  const [pilote, setPilote] = useState(false);
  const [hote, setHote] = useState(false);
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

    if (!query) router.push(`/members?pilote=${pilote}&hote=${hote}`);
    else router.push(`/members?search=${query}&pilote=${pilote}&hote=${hote}`);
  }, [router, query, pilote, hote]);

  return (
    <div className="flex gap-4">
      <Input
        placeholder="Rechercher ..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <div className="flex items-center gap-1">
        <input
          type="checkbox"
          onChange={(e) => setPilote(e.target.checked)}
          checked={pilote}
        />
        <label>Pilote</label>
      </div>
      <div className="flex items-center gap-1">
        <input
          type="checkbox"
          onChange={(e) => setHote(e.target.checked)}
          checked={hote}
        />
        <label>Hôte</label>
      </div>
    </div>
  );
};
export default SearchPer;
