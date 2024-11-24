import { auth } from "@/auth";
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
import { getZone } from "@/lib/_zoneActions";
import React from "react";

type DeleteZonePageProps = {
  params: {
    zoneId: number;
  };
};

const DeleteZonePage = async ({ params }: DeleteZonePageProps) => {
  const res = await getZone(params.zoneId);
  const zone = await res?.data;
  //console.log("params.zoneId", params.zoneId);
  //console.log("ZONE", zone);
  const session = await auth();
  const usr: any = session?.user;
  if (usr?.role != "ADMIN") return <NotAccess />;

  return (
    <PageLayout
      title="Supprimerr une zone"
      description="Cette page permet de supprimer une zone d'impact"
      usr={usr}
    >
      <CustomBreadcrumb name="Suppression zone" />
      <div className="max-w-[800px] mx-auto p-2 rounded-b-lg ">
        <ZoneFormDelete zone={zone} />
      </div>
    </PageLayout>
  );
};

export default DeleteZonePage;

const CustomBreadcrumb = ({ name }: { name: string }) => {
  return (
    <Breadcrumb className=" p-2  bg-gray-100">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Accueil</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />

        <BreadcrumbItem>
          <BreadcrumbLink href="/zones">Zones</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage className="font-semibold">{name}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};
