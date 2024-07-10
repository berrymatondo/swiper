import Map from "@/components/map/map";
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

const CAMPUS = [
  {
    id: 1,
    name: "Icc Bruxelles",
    address: {
      street: "rue des lutins",
      number: "8",
      postalCode: "1190",
      municipality: "Anderlecht",
      latitude: "50.799764350000004",
      longitude: "4.314979675112393",
      city: "Bruxelles",
      country: "Belgique",
    },
  },
  {
    id: 2,
    name: "Icc Mons",
    address: {
      street: "Bd Initialis",
      number: "1",
      postalCode: "7000",
      municipality: "Mons",
      latitude: "50.461406089008385",
      longitude: "3.9314277576727754",
      city: "Bruxelles",
      country: "Belgique",
    },
  },
  {
    id: 3,
    name: "Icc Anvers",
    address: {
      street: "Sint-Cordulastraat",
      number: "22",
      postalCode: "2900",
      municipality: "Schoten",
      latitude: " 51.25063980318993",
      longitude: "4.498942186509163",
      city: "Bruxelles",
      country: "Belgique",
    },
  },
  {
    id: 4,
    name: "Icc Liège",
    address: {
      street: "Rue Arnold Delsupexhe",
      number: "40",
      postalCode: "4040",
      municipality: "Herstal",
      latitude: " 50.68853520149359",
      longitude: "5.645549077576298",
      city: "Bruxelles",
      country: "Belgique",
    },
  },
  {
    id: 5,
    name: "Icc Luxembourg",
    address: {
      street: "Bd John Fitzgerald Kennedy",
      number: "40",
      postalCode: "4170",
      municipality: "Esch-sur-Alzette",
      latitude: " 49.49461123072272",
      longitude: "5.985056628836388",
      city: "Luxembourg",
      country: "Luxembourg",
    },
  },
  {
    id: 6,
    name: "Icc Luxembourg",
    address: {
      street: "Rijn 18E",
      number: "18E",
      postalCode: "2491",
      municipality: "BG Forepark",
      latitude: " 52.069734814019085",
      longitude: "4.389284241767905",
      city: "Deen Haag La Haye",
      country: "Pays-Bas",
    },
  },
];

const BeneluxPage = async () => {
  /*   const cellules = await prisma.cellule.findMany({

    include: {
      address: true,
      zone: true,
    },
    where: {
      name: { contains: search as string, mode: "insensitive" },
    },
    orderBy: {
      name: "asc",
    },
  }); */

  return (
    <PageLayout
      title="Les campus du Benelux"
      description="Voici tous les campus du Benelux"
    >
      <div className="">
        <CustomBreadcrumb name="Campus du Benelux" />
        <div className="md:col-span-3 rounded-lg overflow-hidden">
          <Map campus={CAMPUS} zoom={6} />
        </div>
      </div>
    </PageLayout>
  );
};

export default BeneluxPage;

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
