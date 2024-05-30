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
import ZoneForm from "@/components/zone/zoneForm";
import { getAddress } from "@/lib/_adrActions";
import { getCel } from "@/lib/_celActions";
import { getAllZones, getZone } from "@/lib/_zoneActions";
import React from "react";

type UpdateAdrPageProps = {
  params: {
    adrId: any;
  };
};

const UpdateAdrPage = async ({ params }: UpdateAdrPageProps) => {
  const res = await getAddress(params.adrId);
  const adr = await res?.data;

  /*   const res1 = await getAllZones();
  const allZones = await res1?.data; */

  //console.log("params.zoneId", params.zoneId);
  console.log("adr", adr);

  return (
    <PageLayout
      title="Editer une adresse hôte"
      description="Cette page permet d'éditer une adresse hôtet"
    >
      <CustomBreadcrumb name="Editer une adresse hote" />
      <div className="max-w-[800px] mx-auto p-2 rounded-b-lg ">
        <AdrForm adr={adr} />
      </div>
    </PageLayout>
  );
};

export default UpdateAdrPage;

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
