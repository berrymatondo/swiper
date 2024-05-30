import AdrForm from "@/components/address/adrForm";
import CelForm from "@/components/cel/celForm";
import PageLayout from "@/components/pageLayout";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import React from "react";

const AddAdrPage = async () => {
  return (
    <PageLayout
      title="Ajouter une adresse hôte"
      description="Cette page permet d'ajouter une adresse hôte"
    >
      <CustomBreadcrumb name="Nouveau" />
      <div className="max-w-[800px] mx-auto p-2 rounded-b-lg ">
        <AdrForm />
      </div>
    </PageLayout>
  );
};

export default AddAdrPage;

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
