"use client";
import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";

const videos = [
  {
    id: 1,
    title: "Se Connecter",
    desc: "Comment se connecter à la plateforme",
    value: "item-1",
    url: "/videos/SeConnecter.mp4",
    right: "PILOTE",
  },
  {
    id: 2,
    title: "Editer une cellule",
    desc: "Comment éditer les données d'une cellule",
    value: "item-2",
    url: "/videos/Editerunecellule.mp4",
    right: "PILOTE",
  },
  {
    id: 3,
    title: "Rapport de Cellule",
    desc: "Comment encoder un rapport de cellule de maison sur la plateforme",
    value: "item-3",
    url: "/videos/Nouveaureporting.mp4",
    right: "PILOTE",
  },
  {
    id: 4,
    title: "Editer un rapport",
    desc: "Comment éditer un rapport de cellule",
    value: "item-4",
    url: "/videos/Editerunreporting.mp4",
    right: "PILOTE",
  },
  {
    id: 5,
    title: "Rapport sortie d'évangélisation",
    desc: "Comment encoder un rapport de sortie d'évagélisation sur la plateforme",
    value: "item-4",
    url: "/videos/Reportingévangélisation.mp4",
    right: "PILOTE",
  },
  {
    id: 6,
    title: "Gestion des membres",
    desc: "Comment ajouter/éditer un membre d'une cellule de maison",
    value: "item-5",
    url: "/videos/Gestiondesmembres.mp4",
    right: "PILOTE",
  },
  {
    id: 7,
    title: "Exporter un rapport",
    desc: "Comment exporter le rapport d'une cellule ou d'une sortie d'évangélisation",
    value: "item-6",
    url: "/videos/Téléchargementreporting.mp4",
    right: "PILOTE",
  },
];

type DocsProps = {
  usr: any;
};

const Docs = ({ usr }: DocsProps) => {
  return (
    <div className="md:container">
      <Accordion type="single" collapsible className="w-full">
        {videos
          ?.filter(
            (el: any) =>
              el.right == "PILOTE" ||
              (el.right == "ADMIN" && el.right == usr?.role)
          )
          ?.map((vid: any) => (
            <VideoList key={vid.id} item={vid} />
          ))}
      </Accordion>
    </div>
  );
};

export default Docs;

type VideoItemProps = {
  item: any;
};
export const VideoList = ({ item }: VideoItemProps) => {
  return (
    <AccordionItem value={item.value} key={item.id}>
      <AccordionTrigger>{item.title}</AccordionTrigger>
      <AccordionContent className="flex flex-col  items-start md:gap-4">
        {item.desc}

        <ReactPlayer
          /*           width="500px"
          height="400px" */
          width="100%"
          url={item.url}
          controls={true}
          // light is usefull incase of dark mode
          light={false}
          // picture in picture
          pip={true}
        />
      </AccordionContent>
    </AccordionItem>
  );
};
