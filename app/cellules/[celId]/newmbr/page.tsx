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
import { getAllCels } from "@/lib/_celActions";
import { getAllZones } from "@/lib/_zoneActions";
import React from "react";

type AddMemberPublicPage = {
  params: {
    celId: any;
  };
};

const AddMemberPublicPage = async ({ params }: AddMemberPublicPage) => {
  console.log("Params: ", params);

  const res = await getAllCels();
  const cellules = await res?.data;

  return (
    <PageLayout
      title="Nouveau nouveau membre"
      description="Cette page permet de créer  un nouveau membre lié à une cellule d'impact"
    >
      <CustomBreadcrumb name="Nouveau" />
      <div className="max-w-[800px] mx-auto p-2 rounded-b-lg ">
        <PersonForm cels={cellules} celId={params.celId} />
      </div>
    </PageLayout>
  );
};

export default AddMemberPublicPage;

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
