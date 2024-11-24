import Map from "@/components/map/map";
import PageLayout from "@/components/pageLayout";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { getCel } from "@/lib/_celActions";
import { Cellule, Person } from "@prisma/client";
import React from "react";
import {
  MdAdd,
  MdAddCircle,
  MdAddCircleOutline,
  MdCalendarMonth,
  MdHome,
  MdHouse,
  MdPolicy,
} from "react-icons/md";
import { GoClock } from "react-icons/go";

import { FaMobileAlt } from "react-icons/fa";
import { BiMap } from "react-icons/bi";
import Link from "next/link";
import { auth } from "@/auth";
import CelUpdateBar from "@/components/cel/celUpdateBar";
import { getPersonsCel } from "@/lib/_personActions";
import CelMembers from "@/components/cel/celMembers";
import { TbAlertTriangleFilled } from "react-icons/tb";
import { Badge } from "@/components/ui/badge";
import { IoLogoWhatsapp } from "react-icons/io";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { getAllMeetingsByCel } from "@/lib/_meetingActions";
import MeetingItem from "@/components/meeting/meetingItem";
import Expor from "@/components/reports/expCel";

import EvangItem from "@/components/evang/evangItem";
import { getAllEvangsByCel } from "@/lib/_evangActions";
import CelGraphe from "@/components/graph/celGraph";
import ExportEva from "@/components/reports/expEva";
import EvaGraphe from "@/components/graph/evaGraph";
import MbrGraphe from "@/components/graph/mbrGraph";
import ExportMbr from "@/components/reports/expMbr";
import { GiPoliceOfficerHead } from "react-icons/gi";
import PersonItem from "@/components/person/personItem";
import { ScrollArea } from "@/components/ui/scroll-area";
import Image from "next/image";
import im from "../../../public/images/cellules/anderlecht4.jpg";

type CelDetailsPageProps = {
  params: {
    celId: number;
  };
  searchParams?: { [key: string]: string | undefined };
};

const CelDetailsPage = async ({
  params,
  searchParams,
}: CelDetailsPageProps) => {
  const session = await auth();
  const usr: any = session?.user;
  //console.log("ID", searchParams);

  const res = await getCel(params.celId);
  const cel = res?.data;
  const imag = `/images/cellules/${cel?.ban}.jpeg`;
  //console.log("Image", imag);

  const resu = await getPersonsCel(params.celId);
  const members = resu?.data;

  const reso = await getAllMeetingsByCel(params.celId);
  const meetings = reso?.data;

  const resoo = await getAllEvangsByCel(params.celId);
  const evangs = resoo?.data;

  //console.log("cells: ", cel);

  //
  /* 
<TabsDemo
meetings={meetings}
name={cel?.name}
cel={cel}
members={members}
evangs={evangs}
usr={usr} */

  let cels = [];
  cels.push(cel);

  // MEETINGS
  //console.log("meetings", meetings);

  let tmp2: any = [];
  if (meetings)
    for (let i = 0; i < meetings?.length; i++) {
      tmp2.push({
        date: meetings[i].date,
        participants: meetings[i].nHom + meetings[i].nFem + meetings[i].nEnf,
        /*           meetings[i].nIcc +
          meetings[i].nSta, */
        datein:
          meetings[i].date.substring(0, 4) +
          meetings[i].date.substring(5, 7) +
          meetings[i].date.substring(8, 10),
      });
    }

  tmp2 = tmp2.sort((a: any, b: any) => a.datein - b.datein);
  //console.log("tmp2", tmp2);

  // EVANGS
  //console.log("meetings", evangs);

  let tmp3: any = [];
  if (evangs)
    for (let i = 0; i < evangs?.length; i++) {
      tmp3.push({
        date: evangs[i].date,
        gagnees: evangs[i].nGag,
        evangelisees: evangs[i].nEva,
        venues: evangs[i].nVen,

        datein:
          evangs[i].date.substring(0, 4) +
          evangs[i].date.substring(5, 7) +
          evangs[i].date.substring(8, 10),
      });
    }

  //  console.log("mtp3", tmp3);

  tmp3 = tmp3.sort((a: any, b: any) => a.datein - b.datein);

  // MEMBRES
  //console.log("meetings", members);

  let tmp4: any = [];
  let eff = 0;
  let icc = 0;
  let star = 0;
  if (members) {
    eff = members?.length;
    tmp4.push({ cat: "effectif", nombre: eff, fill: "var(--color-effectif)" });
    icc = (members?.filter((mbr: any) => mbr?.isIcc == true)).length;
    tmp4.push({
      cat: "membreICC",
      nombre: icc,
      fill: "var(--color-membreICC)",
    });
    star = (members?.filter((mbr: any) => mbr?.isStar == true)).length;
    tmp4.push({ cat: "star", nombre: star, fill: "var(--color-star)" });
  }

  // tmp3 = tmp3.sort((a: any, b: any) => a.datein - b.datein);
  //console.log("tmp2", tmp4);
  //const taille = cel?.persons ? cel?.persons.length : 0;

  //console.log("usr", usr);

  //console.log("im", im);
  //console.log("ban", cel?.ban);

  return (
    <PageLayout
      title="Détails d'une cellule d'impact"
      description="Cette page donne toutes les informations sur une cellule d'impact"
      usr={usr}
    >
      <div>
        <CustomBreadcrumb
          name={cel?.name as string}
          zoneName={cel?.zone?.name as string}
        />
        {/*         <div className="md:hidden overflow-hidden  rounded-lg mx-1 flex ">
          <div className="relative">
            <Image
              alt="home"
              src={im}
              layout="fixed"
              height={475}
              className=""
            />

            <div className="bg-sky-900/30 absolute w-full h-full top-0 left-0"></div>

            <p className=" text-center text-5xl  font-bold my-2 boreder-4 border-black text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              {cel?.name}
            </p>
          </div>
        </div> */}
        {/*         <p className=" text-center font-bold my-2 text-sky-600 text-xl">
          {" "}
          {cel?.name}
        </p> */}
        <div className="flex flex-col">
          <div className="flex max-md:flex-col">
            <div className="md:w-1/3  bg-gradient-to-l to-sky-100 from-transparent border-2 m-2 backdrop: rounded-lg overflow-hidden">
              {/*               <div className="flex items-center gap-2 mb-2 ">
                <p className="w-full flex justify-between font-semibold text-blue-800">
                  <span className="flex gap-2 items-center ">
               
                    <MdHome size={20} /> {cel?.name}
                  </span>
                </p>
              </div> */}
              {/*               {usr?.role == "ADMIN" && (
                <div className="flex flex-col items-start">
                  {cel?.persons &&
                    cel?.persons
                      ?.filter((per: Person) => per.isPilote == true)
                      .map((person: Person) => (
                        <div
                          className="flex justify-start items-center gap-2"
                          key={person.id}
                        >
                          <GiPoliceOfficerHead className="text-orange-600" />{" "}
        
                          {person.firstname}
                        </div>
                      ))}
                </div>
              )} */}
              <div className=" flex flex-col gap-2">
                <div className="relative h-40 w-full">
                  <Image
                    alt="home"
                    //src={imag}
                    layout="fixed"
                    src={cel?.ban ? imag : im}
                    fill
                    /*       height={80}
                    width={500} */
                    className="rounded-t-lg object-cover"
                  />

                  <div className="bg-sky-900/30 absolute w-full h-full top-0 left-0"></div>

                  <p className=" text-center text-5xl  font-bold my-2 boreder-4 border-black text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    {cel?.name}
                  </p>
                </div>
                <div className="p-2 rounded-lg text-sky-800 flex items-center max-md:items-start gap-2  ">
                  <BiMap size={20} className="text-green-600" />
                  <div className="font-semibold flex  items-start">
                    {/*                {cel?.address?.hide && ( */}
                    <p className="max-md:text-xs">
                      <span>{cel?.address?.street as string}, </span>
                    </p>
                    {/*      )} */}
                    <p className="max-md:text-xs ">
                      {" "}
                      {cel?.address?.postalCode as string}{" "}
                      {cel?.address?.municipality as string}
                    </p>
                  </div>
                </div>

                <div className="px-2 flex items-center gap-4  md:mb-2">
                  <div className="max-md:text-xs flex items-center gap-2">
                    <MdCalendarMonth size={20} className="text-blue-600" />
                    <p>{cel?.days}</p>
                  </div>
                  <div className="max-md:text-xs flex items-center gap-2">
                    <GoClock size={20} className="text-teal-600" />
                    <p>{cel?.hours}</p>
                  </div>
                </div>
                {/* 
                <div className="">
           

                  {members
                    ?.filter(
                      (mbr: any) =>
                        mbr?.isPilote == true || mbr?.isRespo == true
                    )
                    ?.map((el: any) => (
                      <div>{el.firstname}</div>
                    ))}

    
                </div> */}
                {/* 
                {cel?.address?.hide && (
                  <div className=" border flex  items-start mt-2 p-2 bg-white rounded-lg">
                    <p className="text-sm  italic">
                      {
                        "Veuillez contacter le pilote via le groupe Whatsapp pour avoir l'adresse de la cellule de maison!"
                      }
                    </p>
                  </div>
                )} */}
              </div>
              <div className="flex justify-between items-center w-full p-2">
                {usr ? (
                  <div className=" flex items-center justify-end">
                    <CelUpdateBar usr={usr} cel={cel} />
                  </div>
                ) : (
                  <div></div>
                )}
                {cel?.grpWhatsApp ? (
                  <div className="flex flex-col justify-end">
                    <Badge className=" border-green-600 hover:cursor-pointer max-md:text-xs  hover:text-white text-green-600 bg-transparent w-full  hover:bg-green-800 p-1">
                      {/*             <FaRegHandPointRight size={20} className="mr-2 text-yellow-200" />
                       */}{" "}
                      <IoLogoWhatsapp size={30} className="mr-2" />
                      <Link
                        target="_blank"
                        href={usr?.role == "VISITOR" ? "#" : cel.grpWhatsApp}
                        className="font-semibold text-base"
                      >
                        Rejoindre
                      </Link>
                    </Badge>
                  </div>
                ) : (
                  <div className="  max-md:text-xs text-sm italic">
                    Pas de groupe Whatsapp disponible
                    <p>
                      Contacter: <strong>0484/82.03.62</strong> ou{" "}
                      <strong>0485/80.22.78</strong>
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="p-2 max-h-1/3 md:w-2/3">
              <Map
                cels={cels}
                /*                 show={
                  usr?.role != "ADMIN" ||
                  (usr?.role == "PILOTE" && usr.celluleId != cel?.id)
                } */
                show={!(usr?.role == "PILOTE" && usr.celluleId == cel?.id)}
                haut={300}
              />
            </div>
          </div>

          <div className="p-2">
            {(usr?.role == "ADMIN" ||
              usr?.role == "VISITOR" ||
              (usr?.role == "PILOTE" && usr?.celluleId == cel?.id)) && (
              /*             <CelMembers members={members} />
               */
              <div className="w-full flex  max-md:flex-col gap-2 ">
                <div className=" w-full">
                  <TabsDemo
                    meetings={meetings}
                    name={cel?.name}
                    cel={cel}
                    members={members}
                    evangs={evangs}
                    usr={usr}
                    participants={tmp2}
                    gagnees={tmp3}
                    mbr={tmp4}
                    defTab={searchParams?.defTab}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default CelDetailsPage;

const CustomBreadcrumb = ({
  name,
  zoneName,
}: {
  name: string;
  zoneName: string;
}) => {
  return (
    <Breadcrumb className=" p-2  bg-gray-100">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Accueil</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/zones">{zoneName}</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/cellules">Cellules</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage className="font-semibold">{name}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};

type TabsDEmoProps = {
  name: any;
  meetings: any;
  evangs: any;
  cel: any;
  members: any;
  usr: any;
  participants: any;
  gagnees: any;
  mbr: any;
  defTab?: any;
};
function TabsDemo({
  meetings,
  name,
  cel,
  members,
  evangs,
  usr,
  participants,
  gagnees,
  mbr,
  defTab,
}: TabsDEmoProps) {
  return (
    <Tabs defaultValue={defTab ? defTab : "account"} className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="account">Cellules</TabsTrigger>
        <TabsTrigger value="evang">Evangélisation</TabsTrigger>
        <TabsTrigger value="password">Membres({members?.length})</TabsTrigger>
      </TabsList>
      <TabsContent className="flex max-md:flex-col gap-2" value="account">
        <div className="md:w-1/3 bg-blue-50 border-2 rounded-lg">
          <CelGraphe data={participants} />
        </div>
        <Card className="md:w-2/3">
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              Cellules de maison
              <div className="flex items-center gap-2">
                <Expor meetings={meetings} name={name} />
                <Link
                  href={{
                    pathname: `/cellules/${cel?.id}/meetings/new`,
                    query: { id: cel?.id, name: cel?.name },
                  }}
                >
                  <MdAddCircle size={40} className="text-sky-600" />
                </Link>{" "}
              </div>
            </CardTitle>
            <CardDescription>Tous les rapports de la cellule.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className=" max-sm:max-h-[600px] overflow-auto md:grid  md:gap-3">
              {meetings?.map((meet: any) => (
                <MeetingItem key={meet.id} meeting={meet} usr={usr} />
              ))}
            </div>
            {/*             <div className="space-y-1">
              <Label htmlFor="name">Name</Label>
              <Input id="name" defaultValue="Pedro Duarte" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="username">Username</Label>
              <Input id="username" defaultValue="@peduarte" />
            </div> */}
          </CardContent>
          {/*           <CardFooter>
            <Button>Save changes</Button>
          </CardFooter> */}
        </Card>
      </TabsContent>
      <TabsContent className="flex max-md:flex-col gap-2" value="evang">
        <div className="md:w-1/3 bg-blue-50 border-2 rounded-lg">
          <EvaGraphe data={gagnees} />
        </div>
        <Card className="md:w-2/3">
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              {"Sorties d'évangélisation"}
              <div className="flex items-center gap-2">
                <ExportEva evangs={evangs} name={name} />
                <Link
                  href={{
                    pathname: `/cellules/${cel?.id}/evangs/new`,
                    query: { id: cel?.id, name: cel?.name },
                  }}
                >
                  <MdAddCircle size={40} className="text-sky-600" />
                </Link>
              </div>
            </CardTitle>
            <CardDescription>Tous les rapports des sorties.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className=" max-sm:max-h-[600px] overflow-auto md:grid  md:gap-3">
              {evangs?.map((meet: any) => (
                <EvangItem key={meet.id} evang={meet} usr={usr} />
              ))}
            </div>
            {/*             <div className="space-y-1">
              <Label htmlFor="name">Name</Label>
              <Input id="name" defaultValue="Pedro Duarte" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="username">Username</Label>
              <Input id="username" defaultValue="@peduarte" />
            </div> */}
          </CardContent>
          {/*           <CardFooter>
            <Button>Save changes</Button>
          </CardFooter> */}
        </Card>
      </TabsContent>
      <TabsContent className="flex max-md:flex-col gap-2" value="password">
        <div className="md:w-1/3 bg-blue-50 border-2 rounded-lg">
          <MbrGraphe data={mbr} />
        </div>
        <Card className="md:w-2/3">
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              Membres ({members?.length})
              <div className="flex items-center gap-2">
                <ExportMbr members={members} name={name} />
                <Link
                  href={{
                    pathname: `/cellules/${cel?.id}/newmbr`,
                    query: { id: cel?.id, name: cel?.name },
                  }}
                >
                  <MdAddCircle size={40} className="text-sky-600" />
                </Link>{" "}
              </div>
            </CardTitle>
            <CardDescription>Tous les membres de la cellule.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <ScrollArea className="h-[400px]">
              {members?.map((per: any) => (
                <PersonItem per={per} key={per.id} />
              ))}
            </ScrollArea>
          </CardContent>
          {/*           <CardFooter>
            <Button>Save password</Button>
          </CardFooter> */}
        </Card>
      </TabsContent>
    </Tabs>
  );
}
