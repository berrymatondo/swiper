"use client";
import React, { useEffect, useRef, useState } from "react";
import { Input } from "./ui/input";
import { useRouter } from "next/navigation";
import { useDebounce } from "use-debounce";

const SearchPer = ({
  search,
  pilote,
  hote,
}: {
  search?: string;
  pilote?: boolean;
  hote?: boolean;
}) => {
  const [text, setText] = useState(search);
  const [pilotee, setPilotee] = useState(pilote);
  const [hotee, setHotee] = useState(hote);
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

    if (!query) router.push(`/members?pilote=${pilotee}&hote=${hotee}`);
    else
      router.push(`/members?search=${query}&pilote=${pilotee}&hote=${hotee}`);
  }, [router, query, pilotee, hotee]);

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
          onChange={(e) => setPilotee(e.target.checked)}
          checked={pilotee}
        />
        <label>Pilote</label>
      </div>
      <div className="flex items-center gap-1">
        <input
          type="checkbox"
          onChange={(e) => setHotee(e.target.checked)}
          checked={hotee}
        />
        <label>Hôte</label>
      </div>
    </div>
  );
};
export default SearchPer;
