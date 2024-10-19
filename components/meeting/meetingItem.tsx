"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { BsBuildings } from "react-icons/bs";
import { RiMapPinFill } from "react-icons/ri";
import { BiEditAlt } from "react-icons/bi";

import { Button } from "../ui/button";
import {
  MdEditDocument,
  MdOutlineDeleteForever,
  MdPeople,
} from "react-icons/md";
import { Badge } from "../ui/badge";

type MeetingItemProps = {
  meeting: any;
};

const MeetingItem = ({ meeting }: MeetingItemProps) => {
  const router = useRouter();

  // console.log("meeting: ", meeting);

  return (
    <div
      key={meeting.id}
      // className="shadow-xl rounded-lg my-2 bg-gradient-to-r from-slate-200 to-transparent hover:bg-slate-300 hover:cursor-pointer"
      className="mb-2 py-2 gap-2 flex justify-between shadow-md rounded-lg bg-gradient-to-r from-blue-100 to-transparent hover:cursor-pointer"
    >
      <div
        // onClick={() => router.push(`/zones/${zone.id}`)}
        className=" grid grid-cols-4  w-2/3"
      >
        <div className="rounded-lg col-span-1  bg-gradient-to-r from-blue-50 to-transparent flex flex-col  justify-center items-center">
          <MdEditDocument size={20} className="text-sky-600" />
        </div>
        <div className="relative col-span-3 flex justify-end gap-2 items-end my-2 ml-2 ">
          <p className="text-md font-semibold max-md:text-xs ">
            {meeting.date.split("-").reverse().join("-")}
          </p>

          <Badge className="flex gap-2 bg-sky-800 md:hidden">
            {" "}
            <MdPeople />{" "}
            <span className="text-yellow-200 text-sm max-md:text-xs">
              {+meeting?.nHom + +meeting?.nFem + +meeting?.nEnf}
            </span>
          </Badge>

          <div className=" max-md:hidden">
            <Badge className="flex justify-center gap-2 bg-sky-800">
              {" "}
              Total:
              <span className="text-md">
                {+meeting?.nHom + +meeting?.nFem + +meeting?.nEnf}
              </span>
            </Badge>
            <div className="w-full justify-between mx-2 flex gap-2">
              <span>Hommes: {+meeting?.nHom}</span>
              <span>Femmes: {+meeting?.nFem}</span>
              <span>Enfants: {+meeting?.nEnf}</span>
              <span>Nouveaux: {+meeting?.nNew}</span>
            </div>
          </div>

          {/*         <p className="flex items-end text-md font-semibold ">
            <MdPeople size={30} className="text-sky-800" /> {meeting?.nHom}
          </p> */}
          <span className="max-md:text-xs font-semibold flex flex-col items-start gap-2 text-purple-900">
            {/*             <span>
              {meeting?.cellules.length}
              {" Rapport(s)"}
            </span> */}
          </span>
        </div>
      </div>
      <div className="md:hidden flex justify-between gap-4 items-center mx-4 ">
        <MdOutlineDeleteForever
          className="text-red-400"
          onClick={() =>
            router.push(
              `/admin/meetings/delete/${meeting.id}?date=${meeting.date}&name=${meeting.cellule.name}&celluleId=${meeting.celluleId}&meetingId=${meeting.id}`
            )
          }
          size={20}
        />
        <BiEditAlt
          onClick={() => router.push(`/admin/meetings/update/${meeting.id}`)}
          className="text-gray-600"
          size={20}
        />
      </div>
      <div className="flex justify-between gap-4 items-center mx-4 max-md:hidden">
        <Button
          className=" text-red-400"
          variant="secondary"
          onClick={() =>
            router.push(
              `/admin/meetings/delete/${meeting.id}?date=${meeting.date}&name=${meeting.cellule.name}&celluleId=${meeting.celluleId}&meetingId=${meeting.id}`
            )
          }
        >
          Supprimer
        </Button>
        <Button
          className=""
          onClick={() => router.push(`/admin/meetings/update/${meeting.id}`)}
        >
          Modifier
        </Button>
      </div>
    </div>
  );
};

export default MeetingItem;
