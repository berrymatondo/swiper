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
import { FaRegHandPointRight } from "react-icons/fa";

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

const linksList = [
  {
    id: 1,
    name: "Pourquoi servir dans une cellule d'impact",
    href: "/infos",
    external: false,
    //  icon: <MdDashboard size={40} />,
    // color: "text-orange-400",
  },
  {
    id: 2,
    name: "Parcours de croissance de la nouvelle création",
    href: "https://impactcentrechretien.elvanto.eu/form/d91ad054-677e-4bf9-a89f-6faad376342e",
    external: true,
  },
  {
    id: 3,
    name: "A propos de l'église Impact Centre Chrétien",
    href: "https://impactcentrechretien.com/",
    external: true,
  },
  {
    id: 4,
    name: "IEBI - Ecole Biblique Internationale",
    href: "https://ecolebiblique.com/",
    external: true,
  },
];

const InfosNav = () => {
  return (
    <div className="bg-gradient-to-tr from-blue-200 transparent flex flex-col justify-start items-center p-2 my-2 gap-2 text-black  rounded-bl-2xl">
      <p className="uppercase text-lg font-semibold text-orange-800">
        Informations utiles
      </p>

      {linksList.map((nav) => (
        <Link
          className="grid gap-1 grid-cols-12 hover:text-orange-600   text-blue-900 p-1 rounded-bl-2xl rounded-tr-2xl"
          key={nav.id}
          href={nav.href}
          target={nav.external ? "_blank" : ""}
        >
          <FaRegHandPointRight
            size={20}
            className="col-span-2 text-orange-800"
          />

          <span className="col-span-10">{nav.name}</span>
        </Link>
      ))}

      {/*       {navList.map((nav) => (
        <Link
          className=" w-full border border-neutral-300 rounded-lg p-2 hover:cursor-pointer hover:bg-gray-200"
          key={nav.id}
          href={nav.href}
        >
          <p className={`flex gap-4 items-end ${nav.color}`}>
            {nav.icon}
            <span className="text-xl">{nav.name}</span>
          </p>
        </Link>
      ))} */}
    </div>
  );
};

export default InfosNav;
