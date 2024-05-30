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
import React from "react";

const AddZonePage = () => {
  return (
    <PageLayout
      title="Créer une nouvelle zone"
      description="Cette page permet de créer une nouvelle zone d'impact"
    >
      <CustomBreadcrumb name="Nouveau" />
      <div className="max-w-[800px] mx-auto p-2 rounded-b-lg ">
        <ZoneForm />
      </div>
    </PageLayout>
  );
};

export default AddZonePage;

const CustomBreadcrumb = ({ name }: { name: string }) => {
  return (
    <Breadcrumb>
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
