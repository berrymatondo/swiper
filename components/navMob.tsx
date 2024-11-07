"use client";
import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { MdMenu } from "react-icons/md";

import Link from "next/link";
import {
  MdDashboard,
  MdEditDocument,
  MdHouse,
  MdOutlinePerson,
  MdPeopleOutline,
} from "react-icons/md";
import { BsBuildings, BsHouse } from "react-icons/bs";
import LNK from "./lnk";
import { useRouter } from "next/navigation";

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

type NavMobProps = {
  usr: any;
};
const NavMob = ({ usr }: NavMobProps) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost">
          <MdMenu size={20} />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle></SheetTitle>
          <SheetDescription></SheetDescription>
        </SheetHeader>
        {/*         <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" value="Pedro Duarte" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input id="username" value="@peduarte" className="col-span-3" />
          </div>
        </div> */}
        <div className="flex flex-col pt-8 gap-4">
          {usr?.role == "ADMIN" && (
            <Button
              onClick={() => {
                router.push("/dashboard");
                setOpen(false);
              }}
              className="bg-gradient-to-r from-sky-600 to-transparent"
            >
              Dashboard
            </Button>
          )}

          <Button
            onClick={() => {
              router.push("/cellules");
              setOpen(false);
            }}
            className="bg-gradient-to-r from-sky-600 to-transparent"
          >
            Les cellules
          </Button>

          <Button
            onClick={() => {
              router.push("/members");
              setOpen(false);
            }}
            className="bg-gradient-to-r from-sky-600 to-transparent"
          >
            Les membres
          </Button>

          {usr?.role == "ADMIN" && (
            <Button
              onClick={() => {
                router.push("/meetings");
                setOpen(false);
              }}
              className="bg-gradient-to-r from-sky-600 to-transparent"
            >
              Rapports
            </Button>
          )}

          {usr?.role == "ADMIN" && (
            <Button
              onClick={() => {
                router.push("/addresses");
                setOpen(false);
              }}
              className="bg-gradient-to-r from-sky-600 to-transparent"
            >
              Hôtes
            </Button>
          )}

          {usr?.role == "ADMIN" && (
            <Button
              onClick={() => {
                router.push("/zones");
                setOpen(false);
              }}
              className="bg-gradient-to-r from-sky-600 to-transparent"
            >
              Zones
            </Button>
          )}

          {usr?.role == "ADMIN" && (
            <Button
              onClick={() => {
                router.push("/auth/users");
                setOpen(false);
              }}
              className="bg-gradient-to-r from-sky-600 to-transparent"
            >
              Utilisateurs
            </Button>
          )}

          <Button
            onClick={() => {
              router.push("/docs");
              setOpen(false);
            }}
            className="bg-gradient-to-r from-sky-600 to-transparent"
          >
            Documentation
          </Button>
        </div>

        <SheetFooter>
          {/*           <SheetClose asChild>
            <Button type="submit">
              <LNK />
            </Button>
          </SheetClose>
          <SheetClose asChild>
            <Button type="submit">Save changes</Button>
          </SheetClose> */}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default NavMob;

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
