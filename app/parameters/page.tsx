import PageLayout from "@/components/pageLayout";
import ParamForm from "@/components/parameters/paramForm";
import Upload from "@/components/upload";
import { getAllParameters } from "@/lib/_paramActions";
import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const ParametersPage = async () => {
  const paramList = await getAllParameters();
  //console.log("paramList ", paramList?.data);

  return (
    <div>
      <PageLayout
        title="Liste des membres des cellules d'impact"
        description="La liste de tous les membres des cellules d'impact"
        //usr={usr}
      >
        <CustomBreadcrumb name={"Paramètres"} />
        <ParamForm paramList={paramList?.data} />
        {/*       <Upload />
         */}{" "}
      </PageLayout>
    </div>
  );
};

export default ParametersPage;

const CustomBreadcrumb = ({ name }: { name: string }) => {
  return (
    <Breadcrumb className=" p-2  bg-gray-100">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Accueil</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        {/*         <BreadcrumbItem>
          <BreadcrumbLink href="/zones">Zones</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator /> */}
        <BreadcrumbItem>
          <BreadcrumbPage className="font-semibold">{name}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};
