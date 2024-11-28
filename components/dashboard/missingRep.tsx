"use client";
import Link from "next/link";
import React, { useState } from "react";
import { MdCheckBox } from "react-icons/md";

type MissingReportsProps = {
  resuu: any;
};
const MissingReports = ({ resuu }: MissingReportsProps) => {
  const [show, setShow] = useState(false);
  return (
    <div className="flex flex-col items-center justify-center ">
      <div
        onClick={() => setShow(!show)}
        className="p-2 rounded-full flex bg-red-600 hover:cursor-pointer hover:bg-red-400 font-bold text-white m-1"
      >
        {show ? "Cacher la liste" : "Afficher rapports pas soumis"}
      </div>
      {show && (
        <div className=" flex flex-col gap-8 m-4">
          <div>
            <p className="text-red-600">En rouge: pas de rapport rendu</p>
            <p>En noir: rapport avec 0 participant</p>
          </div>
          <div className="md:flex gap-4">
            {resuu?.map((el: any, index: number) => (
              <div
                key={index}
                className="max-md:mb-2 bg-slate-200 p-2 rounded-lg"
              >
                <strong>{el?.date}</strong>
                {el?.rap
                  ?.filter(
                    (el: any) =>
                      el.sent != true || (el.sent == true && el.tot == 0)
                  )
                  ?.map((ee: any, index: number) => (
                    <div key={ee.id} className="flex m-1">
                      <Link href={`/cellules/${ee.id}`}>
                        {ee?.sent != true ? (
                          <span className="text-red-600">{ee.name}</span>
                        ) : (
                          <span>{ee.name}</span>
                        )}
                      </Link>
                      {/*                 {ee.sent ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}
                       */}{" "}
                    </div>
                  ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MissingReports;
