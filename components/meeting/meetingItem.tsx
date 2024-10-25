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
  usr: any;
};

const MeetingItem = ({ meeting, usr }: MeetingItemProps) => {
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
        <div className="  rounded-lg col-span-1 max-md:col-span-2  bg-gradient-to-r from-blue-50 to-transparent flex gap-2  justify-center items-center">
          <MdEditDocument size={20} className="text-sky-600" />
          <p className="text-md font-semibold max-md:text-xs ">
            {meeting.date.split("-").reverse().join("-")}
          </p>
        </div>
        <div className="relative col-span-3  max-md:col-span-2 flex justify-end gap-2 items-end my-2 ml-2 ">
          <Badge className="flex gap-2 bg-sky-800 md:hidden">
            {" "}
            <MdPeople />{" "}
            <span className="text-yellow-200 text-sm max-md:text-xs">
              {+meeting?.nHom + +meeting?.nFem + +meeting?.nEnf}
            </span>
          </Badge>

          <div className=" max-md:hidden">
            <div className="text-sm w-full items-center justify-between mx-2 flex gap-2">
              <div className="w-8 h-8 text-white flex justify-center items-center rounded-full bg-sky-800">
                {+meeting?.nHom + +meeting?.nFem + +meeting?.nEnf}
              </div>
              <span>Hom: {+meeting?.nHom}</span>
              <span>Fem: {+meeting?.nFem}</span>
              <span>Enf: {+meeting?.nEnf}</span>
              <span>New: {+meeting?.nNew}</span>
              <span>Icc: {+meeting?.nIcc}</span>
              <span>Star: {+meeting?.nSta}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="md:hidden flex justify-between gap-4 items-center mx-4 ">
        {usr?.role == "ADMIN" && (
          <MdOutlineDeleteForever
            className="text-red-400"
            onClick={() =>
              router.push(
                `/admin/meetings/delete/${meeting.id}?date=${meeting.date}&name=${meeting.cellule.name}&celluleId=${meeting.celluleId}&meetingId=${meeting.id}`
              )
            }
            size={20}
          />
        )}
        <BiEditAlt
          onClick={() =>
            router.push(
              `/admin/meetings/${meeting.id}/update/?meetingId=${meeting.id}&celluleId=${meeting.celluleId}`
            )
          }
          className="text-gray-600"
          size={20}
        />
      </div>
      <div className="flex justify-between gap-4 items-center mx-4 max-md:hidden">
        {usr?.role == "ADMIN" && (
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
        )}
        <Button
          className=""
          onClick={() =>
            router.push(
              `/admin/meetings/${meeting.id}/update/?meetingId=${meeting.id}&celluleId=${meeting.celluleId}`
            )
          }
        >
          Modifier
        </Button>
      </div>
    </div>
  );
};

export default MeetingItem;
