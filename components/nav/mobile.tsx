import Link from "next/link";
import React from "react";
import {
  MdDashboard,
  MdEditDocument,
  MdHouse,
  MdOutlinePerson,
  MdPeopleOutline,
} from "react-icons/md";
import { Label } from "../ui/label";
import { BsBuildings, BsHouse } from "react-icons/bs";

const navList = [
  {
    id: 1,
    name: "Board",
    href: "/dashboard",
    icon: <MdDashboard size={40} />,
    color: "text-orange-400",
  },
  {
    id: 2,
    name: "Cellules",
    href: "/cellules",
    icon: <MdHouse size={40} />,
    color: "text-green-400",
  },
  {
    id: 3,
    name: "Zones",
    href: "/zones",
    icon: <BsBuildings size={40} />,
    color: "text-teal-800",
  },
  {
    id: 4,
    name: "Rapports",
    href: "/meetings",
    icon: <MdEditDocument size={40} />,
    color: "text-blue-400",
  },
  {
    id: 5,
    name: "Membres",
    href: "/members",
    icon: <MdPeopleOutline size={40} />,
    color: "text-purple-400",
  },
  ,
  {
    id: 6,
    name: "Hôtes",
    href: "/addresses",
    icon: <BsHouse size={40} />,
    color: "text-teal-600",
  },
  {
    id: 7,
    name: "Users",
    href: "/auth/users",
    icon: <MdOutlinePerson size={40} />,
    color: "text-cyan-400",
  },
];

const MobileNav = () => {
  return (
    <div className="flex justify-between items-center p-2 my-2  text-black bg-gray-100 rounded-md">
      {navList.map((nav) => (
        <Link key={nav?.id} href={nav?.href ? nav?.href : "/"}>
          <span
            className={`flex flex-col justify-center items-center ${nav?.color}`}
          >
            {nav?.icon}
            <Label className="text-xs">{nav?.name}</Label>
          </span>
        </Link>
      ))}
    </div>
  );
};

export default MobileNav;
