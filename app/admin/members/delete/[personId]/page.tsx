import CelFormDelete from "@/components/cel/celFormDelete";
import PageLayout from "@/components/pageLayout";
import PerFormDelete from "@/components/person/perFormDelete";
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
import { getCel } from "@/lib/_celActions";
import { getPerson } from "@/lib/_personActions";
import { getZone } from "@/lib/_zoneActions";
import React from "react";

type DeletePerPageProps = {
  params: {
    personId: number;
  };
};

const DeletePerPage = async ({ params }: DeletePerPageProps) => {
  const res = await getPerson(params.personId);
  const per = await res?.data;
  //console.log("params.zoneId", params.zoneId);
  //console.log("ZONE", zone);

  return (
    <PageLayout
      title="Supprimer un membre"
      description="Cette page permet de supprimer un membre d'une cellule d'impact"
    >
      <CustomBreadcrumb name="Suppression membre" />
      <div className="max-w-[800px] mx-auto p-2 rounded-b-lg ">
        <PerFormDelete per={per} />
      </div>
    </PageLayout>
  );
};

export default DeletePerPage;

const CustomBreadcrumb = ({ name }: { name: string }) => {
  return (
    <Breadcrumb className=" p-2  bg-gray-100">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Accueil</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />

        <BreadcrumbItem>
          <BreadcrumbLink href="/zones">Members</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage className="font-semibold">{name}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};
