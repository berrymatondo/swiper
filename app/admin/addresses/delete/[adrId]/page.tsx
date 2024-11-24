import { auth } from "@/auth";
import AdrFormDelete from "@/components/address/AdrFormDelete";
import CelFormDelete from "@/components/cel/celFormDelete";
import NotAccess from "@/components/notAccess";
import PageLayout from "@/components/pageLayout";
import Title from "@/components/title";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import ZoneForm from "@/components/zone/zoneForm";
import ZoneFormDelete from "@/components/zone/zoneFormDelete";
import { getAddress } from "@/lib/_adrActions";
import { getCel } from "@/lib/_celActions";
import { getZone } from "@/lib/_zoneActions";
import React from "react";

type DeleteAdrPageProps = {
  params: {
    adrId: any;
  };
};

const DeleteAdrPage = async ({ params }: DeleteAdrPageProps) => {
  const res = await getAddress(params.adrId);
  const adr = await res?.data;
  //console.log("params.zoneId", params.zoneId);
  //console.log("ZONE", zone);

  const session = await auth();
  const usr: any = session?.user;
  if (usr?.role != "ADMIN" && usr?.role != "PILOTE") return <NotAccess />;

  return (
    <PageLayout
      title="Supprimer une adresse hôte cellule"
      description="Cette page permet de supprimer une adresse hôte"
    >
      <CustomBreadcrumb name="Suppression adresse hôte" />
      <div className="max-w-[800px] mx-auto p-2 rounded-b-lg ">
        <AdrFormDelete adr={adr} />
      </div>
    </PageLayout>
  );
};

export default DeleteAdrPage;

const CustomBreadcrumb = ({ name }: { name: string }) => {
  return (
    <Breadcrumb className=" p-2  bg-gray-100">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Accueil</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />

        <BreadcrumbItem>
          <BreadcrumbLink href="/addresses">Adresses</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage className="font-semibold">{name}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};
