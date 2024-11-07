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
    icon: <MdDashboard size={20} />,
    color: "text-orange-400",
    right: "ADMIN",
  },
  {
    id: 2,
    name: "Cellules",
    href: "/cellules",
    icon: <MdHouse size={20} />,
    color: "text-green-400",
    right: "PILOTE",
  },
  {
    id: 3,
    name: "Zones",
    href: "/zones",
    icon: <BsBuildings size={20} />,
    color: "text-teal-800",
    right: "ADMIN",
  },
  {
    id: 4,
    name: "Rapports",
    href: "/meetings",
    icon: <MdEditDocument size={20} />,
    color: "text-blue-400",
    right: "ADMIN",
  },
  {
    id: 5,
    name: "Membres",
    href: "/members",
    icon: <MdPeopleOutline size={20} />,
    color: "text-purple-400",
    right: "PILOTE",
  },
  ,
  {
    id: 6,
    name: "Hôtes",
    href: "/addresses",
    icon: <BsHouse size={20} />,
    color: "text-teal-600",
    right: "ADMIN",
  },
  {
    id: 7,
    name: "Users",
    href: "/auth/users",
    icon: <MdOutlinePerson size={20} />,
    color: "text-cyan-400",
    right: "ADMIN",
  },
  {
    id: 8,
    name: "Documentation",
    href: "/docs",
    icon: <MdEditDocument size={20} />,
    color: "text-sky-700",
    right: "PILOTE",
  },
];

type MobileNavProps = {
  usr: any;
};

const MobileNav = ({ usr }: MobileNavProps) => {
  //console.log("usr", usr?.role);
  //console.log("navList", usr?.role);

  if (usr?.role == "PILOTE") {
    return (
      <div className="flex justify-between items-center gap-4 p-2 my-2  text-black bg-gray-100 rounded-md">
        {navList
          ?.filter((el: any) => el.right == "PILOTE")
          ?.map((nav) => (
            <Link key={nav?.id} href={nav?.href ? nav?.href : "/"}>
              <span
                className={`flex  justify-center items-center ${nav?.color}`}
              >
                {nav?.icon}
                <Label className="hover:cursor-pointer">{nav?.name}</Label>
              </span>
            </Link>
          ))}
      </div>
    );
  }
  return (
    <div className="flex justify-between items-center gap-4 p-2 my-2  text-black bg-gray-100 rounded-md">
      {navList.map((nav) => (
        <Link key={nav?.id} href={nav?.href ? nav?.href : "/"}>
          <span className={`flex  justify-center items-center ${nav?.color}`}>
            {nav?.icon}
            <Label className="hover:cursor-pointer">{nav?.name}</Label>
          </span>
        </Link>
      ))}
    </div>
  );
};

export default MobileNav;
