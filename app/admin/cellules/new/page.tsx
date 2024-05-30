import CelForm from "@/components/cel/celForm";
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
import { getAddresses } from "@/lib/_adrActions";
import { getAllZones } from "@/lib/_zoneActions";
import React from "react";

const AddCelPage = async () => {
  const res = await getAllZones();
  const allZones = await res?.data;

  const res2 = await getAddresses();
  const allAddresses = await res2?.data;

  return (
    <PageLayout
      title="Créer une nouvelle cellule"
      description="Cette page permet de créer une nouvelle cellule d'impact"
    >
      <CustomBreadcrumb name="Nouveau" />
      <div className="max-w-[800px] mx-auto p-2 rounded-b-lg ">
        <CelForm allZones={allZones} addresses={allAddresses} />
      </div>
    </PageLayout>
  );
};

export default AddCelPage;

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
