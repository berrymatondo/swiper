"use client";
import { Person } from "@prisma/client";
import React, { useState } from "react";

type CelMembersProps = {
  members: any;
};
const CelMembers = ({ members }: CelMembersProps) => {
  const [show, setShow] = useState(false);
  return (
    <>
      <div className="p-2" onClick={() => setShow(!show)}>
        {show ? (
          <span className="hover:text-blue-800 hover:cursor-pointer font-semibold">
            Cacher la liste ({members.length})
          </span>
        ) : (
          <span className="hover:text-blue-800 hover:cursor-pointer font-semibold">
            Afficher les membres ({members.length})
          </span>
        )}
        {show &&
          members &&
          members.map((mbr: Person) => (
            <p key={mbr.id} className="text-sm">
              <span className="uppercase">{mbr.lastname}</span> {mbr.firstname}{" "}
              {mbr.isPilote ? "(Pilote)" : ""}
            </p>
          ))}
      </div>
    </>
  );
};

export default CelMembers;
