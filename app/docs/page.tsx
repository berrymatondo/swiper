import { auth } from "@/auth";
import Docs from "@/components/docs";
import NotAccess from "@/components/notAccess";
import PageLayout from "@/components/pageLayout";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import React, { Suspense } from "react";

const DocsPage = async () => {
  const session = await auth();
  const usr: any = session?.user;

  if (
    !usr ||
    (usr?.role != "PILOTE" && usr.role != "ADMIN" && usr.role != "VISITOR")
  )
    return <NotAccess />;

  return (
    <PageLayout
      title="Détails d'une cellule d'impact"
      description="Cette page donne toutes les informations sur une cellule d'impact"
      usr={usr}
    >
      <div>
        <CustomBreadcrumb name={`Documentation ${usr?.role}`} />
        <div className="md:container max-md:px-2 md:flex md:justify-center">
          <div className="mt-8 md:w-2/3">
            <Suspense fallback={<div>Chargement...</div>}>
              <Docs usr={usr} />
            </Suspense>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default DocsPage;

const CustomBreadcrumb = ({ name }: { name: string }) => {
  return (
    <Breadcrumb className=" p-2  bg-gray-100">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Accueil</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        {/*         <BreadcrumbItem>
          <BreadcrumbLink href="/zones">{zoneName}</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/cellules">Cellules</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator /> */}
        <BreadcrumbItem>
          <BreadcrumbPage className="font-semibold">{name}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};
