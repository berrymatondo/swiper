"use client";
import { Person } from "@prisma/client";
import React, { useState } from "react";
import { GiPoliceOfficerHead } from "react-icons/gi";

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
            Cacher la liste ({members.length}){" "}
          </span>
        ) : (
          <span className="hover:text-blue-800 hover:cursor-pointer font-semibold">
            Voir les membres ({members.length})
          </span>
        )}
        {show &&
          members &&
          members.map((mbr: Person) => (
            <div key={mbr.id} className="text-sm flex gap-1 items-center">
              <span className="uppercase">{mbr.lastname}</span> {mbr.firstname}{" "}
              {mbr.isPilote ? (
                <p className="flex gap-1 items-center">
                  <span className="font-semibold text-blue-800">(Pilote)</span>
                  <GiPoliceOfficerHead className="text-orange-600" />
                </p>
              ) : (
                ""
              )}
            </div>
          ))}
      </div>
    </>
  );
};

export default CelMembers;
