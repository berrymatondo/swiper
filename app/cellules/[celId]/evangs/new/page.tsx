import { auth } from "@/auth";
import EvangForm from "@/components/evang/evangForm";
import MeetingForm from "@/components/meeting/meetingForm";
import NotAccess from "@/components/notAccess";
import PageLayout from "@/components/pageLayout";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { getAllCels } from "@/lib/_celActions";
import { getAllZones } from "@/lib/_zoneActions";
import React from "react";

const AddEvangPage = async ({
  searchParams,
}: {
  searchParams?: { [key: string]: string | undefined };
}) => {
  //console.log("Paramsxxx", searchParams);
  const session = await auth();
  const usr: any = session?.user;
  const res = await getAllCels();
  const cellules = res?.data;
  const ress = await getAllZones();
  const zones = ress?.data;

  if (usr?.role != "ADMIN" && usr?.role != "PILOTE") return <NotAccess />;

  return (
    <PageLayout
      title="Nouveau rapport"
      description="Cette page permet de créer  un nouveau membre lié à une cellule d'impact"
    >
      <CustomBreadcrumb name={`Raport ${searchParams?.name}`} />
      <div className="max-w-[800px] mx-auto p-2 rounded-b-lg ">
        <EvangForm
          zones={zones}
          cels={cellules}
          userSession={usr}
          celId={searchParams?.id}
        />
      </div>
    </PageLayout>
  );
};

export default AddEvangPage;

const CustomBreadcrumb = ({ name }: { name: string }) => {
  return (
    <Breadcrumb className=" p-2  bg-gray-100">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Accueil</BreadcrumbLink>
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
