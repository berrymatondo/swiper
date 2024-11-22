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

  //console.log("meeting:", meeting);
  // tmp3 = tmp3.sort((a: any, b: any) => a.datein - b.datein);

  return (
    <div
      key={meeting.id}
      // className="shadow-xl rounded-lg my-2 bg-gradient-to-r from-slate-200 to-transparent hover:bg-slate-300 hover:cursor-pointer"
      className="mb-2  gap-2 flex justify-between shadow-md rounded-lg bg-gradient-to-r from-blue-100 to-transparent hover:cursor-pointer"
    >
      <div
        // onClick={() => router.push(`/zones/${zone.id}`)}
        className=" grid grid-cols-5  w-3/4"
      >
        <div className="max-md:px-1 px-2 rounded-lg col-span-4 max-md:col-span-4  bg-gradient-to-r from-blue-50 to-transparent flex gap-2  justify-between items-center">
          {/*           <MdEditDocument size={20} className="text-sky-600" />
           */}{" "}
          {/*           <p className="text-md font-semibold max-md:text-xs ">
            {meeting.date.split("-").reverse().join("-")}
          </p> */}
          <Badge
            onClick={() => router.push(`/cellules/${meeting.celluleId}`)}
            className="bg-sky-700"
          >
            {meeting?.cellule?.name}
          </Badge>
          <span className="text-xs">
            {meeting.date.split("-").reverse().join("-")}
          </span>
        </div>
        <div className=" relative col-span-1  max-md:col-span-1 flex justify-between gap-2 items-center my-2 ml-2 ">
          <Badge className="flex gap-2 bg-sky-800 md:hidden">
            {" "}
            <MdPeople />{" "}
            <span className="text-yellow-200 text-sm max-md:text-xs">
              {+meeting?.nHom + +meeting?.nFem + +meeting?.nEnf}
            </span>
          </Badge>
          {/*           <p className="text-xs md:hidden">{meeting?.cellule?.name}</p>
           */}
          <div className="w-full max-md:hidden">
            <div className="text-sm w-full items-center justify-between mx-2 flex gap-2">
              <div className="gap-2 p-1 text-white flex justify-center items-center rounded-full bg-sky-800">
                <strong className="text-yellow-300">
                  {+meeting?.nHom + +meeting?.nFem + +meeting?.nEnf}
                </strong>
                <span className="text-xs">Participants</span>
              </div>
              {/*               <span>Hom: {+meeting?.nHom}</span>
              <span>Fem: {+meeting?.nFem}</span>
              <span>Enf: {+meeting?.nEnf}</span>
              <span>New: {+meeting?.nNew}</span>
              <span>Icc: {+meeting?.nIcc}</span>
              <span>Star: {+meeting?.nSta}</span> */}
              {/*               <Badge
                onClick={() => router.push(`/cellules/${meeting.celluleId}`)}
                className="bg-sky-700"
              >
                {meeting?.cellule?.name}
              </Badge> */}
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
          <Badge
            className=" text-red-400"
            variant="secondary"
            onClick={() =>
              router.push(
                `/admin/meetings/delete/${meeting.id}?date=${meeting.date}&name=${meeting?.cellule?.name}&celluleId=${meeting.celluleId}&meetingId=${meeting.id}`
              )
            }
          >
            Supprimer
          </Badge>
        )}
        <Badge
          className=""
          onClick={() =>
            router.push(
              `/admin/meetings/${meeting.id}/update/?meetingId=${meeting.id}&celluleId=${meeting.celluleId}`
            )
          }
        >
          Modifier
        </Badge>
      </div>
    </div>
  );
};

export default MeetingItem;
