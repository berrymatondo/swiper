import CelForm from "@/components/cel/celForm";
import PageLayout from "@/components/pageLayout";
import PersonForm from "@/components/person/personForm";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import ZoneForm from "@/components/zone/zoneForm";
import { getAllCels, getCel } from "@/lib/_celActions";
import { getPerson } from "@/lib/_personActions";
import { getAllZones, getZone } from "@/lib/_zoneActions";
import React from "react";

type UpdatePerPageProps = {
  params: {
    personId: number;
  };
};

const UpdatePerPage = async ({ params }: UpdatePerPageProps) => {
  const res = await getPerson(params.personId);
  const per = await res?.data;

  const res1 = await getAllCels();
  const cels = await res1?.data;

  console.log("CELS:", cels);

  //const res1 = await getAllZones();
  //const allZones = await res1?.data;

  //console.log("params.zoneId", params.zoneId);
  //console.log("personId", params.personId);
  //console.log("PER", per);

  return (
    <PageLayout
      title="Editer un membre"
      description="Cette page permet d'éditer un membre d'une cellule d'impact"
    >
      <CustomBreadcrumb name="Editer un membre" />
      <div className="max-w-[800px] mx-auto p-2 rounded-b-lg ">
        <PersonForm mbr={per} cels={cels} />
      </div>
    </PageLayout>
  );
};

export default UpdatePerPage;

const CustomBreadcrumb = ({ name }: { name: string }) => {
  return (
    <Breadcrumb className=" p-2  bg-gray-100">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Accueil</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />

        <BreadcrumbItem>
          <BreadcrumbLink href="/members">Membres</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage className="font-semibold">{name}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};
