"use client";
import Image from "next/image";
import logoicc0 from "../public/logoicc0.png";
import allgis from "../public/al.jpg";
import { usePathname, useRouter } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "./ui/breadcrumb";
import { Link, Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { NAV_LINKS } from "@/constants";
import MobileNav from "./nav/mobile";
import MobileAdminNav from "./nav/mobileAdmin";
import Title from "./title";
import DesktopNav from "./nav/desktopNAv";
import { MdLogin } from "react-icons/md";
import InfosNav from "./nav/infosNav";

type PageLayoutProps = {
  title: string;
  description?: string;
  children: React.ReactNode;
  usr: any;
};
const PageLayout = ({ title, description, children, usr }: PageLayoutProps) => {
  const router = useRouter();

  const [openNav, setOpenNav] = useState(false);

  const toggleNavbar = () => {
    setOpenNav(!openNav);
  };

  return (
    <div className="md:container p-1">
      <div className="bg-black/50 rounded-lg overflow-hidden relative max-sm:p-1  flex flex-col max-sm:h-[70px] h-[150px] w-full ">
        <div className="  overflow-hidden justify-between flex items-center gap-4 text-3xl md:p-10 w-full ">
          <Image
            onClick={() => router.push("/")}
            alt="home"
            src={logoicc0}
            quality={100}
            className="hover:cursor-pointer bg-gradient-to-tr from-yellow-200/40 p-2 to-transparent -2 bg-black rounded-full top-2 left-1 text-center z-5 max-sm:w-1/6 md:w-1/12 "
          />
          <Image
            alt="home"
            src={allgis}
            quality={100}
            className="absolute top-0 left-0 rounded-lg -z-10 "
          />
          <p className=" text-orange-400 max-sm:text-2xl text-6xl">
            {"Cellules "}
            <span className="text-white font-semibold">de maison</span>
          </p>
          {!usr && (
            <div className="hover:cursor-pointer hover:text-white flex-col items-center text-yellow-300 md:flex">
              <MdLogin
                className="mx-2 "
                onClick={() => router.push("/auth/login")}
              />
              {/*             <p className=" text-yellow-300 max-md:hidden text-sm md:text-muted">
              Se Connecter
            </p> */}
            </div>
          )}
        </div>
      </div>
      {/* <MobileNav /> */}
      {/*       <MobileAdminNav />
       */}{" "}
      {/*       <Title title={title} description={description} />
       */}{" "}
      <div className="grid md:grid-cols-5 gap-4 mt-4 h-full ">
        {/*         <div className="max-md:hidden col-span-1 rounded-lg ">
          <InfosNav />
        </div> */}
        <div className="col-span-5 rounded-lg bg-transparent md:p-2">
          {children}
        </div>
      </div>
      <div className="fixed w-full bottom-0 left-0"></div>
    </div>
  );
};

export default PageLayout;
