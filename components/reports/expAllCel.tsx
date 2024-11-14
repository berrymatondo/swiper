"use client";
import { Cellule } from "@prisma/client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { MdOutlineCloudDownload } from "react-icons/md";
import * as XLSX from "xlsx";

type ExporProps = {
  celss?: any;
};

export default function ExpAllCel({ celss }: ExporProps) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  //console.log("meeting", celss);
  const cels = [...celss];
  /*   let cels: any = [];
  for (let i = 0; i < celss.length; i++) {
    cels.push({
      name: celss[i].name,
      grpWhatsApp: celss[i].grpWhatsApp,
      statut: celss[i].statut,
      pilotes: celss[i]?.persons
        ?.filter((p: any) => p.isPilote == true)
        ?.map((per: any) => per.firstname + " " + per.lastname),
    });
  } */

  // console.log("Cels", cels);

  const onGetExporProduct = async (title?: string, worksheetname?: string) => {
    try {
      setLoading(true);
      //   const response = await fetch("https://fakestoreapi.com/products");

      if (cels && Array.isArray(cels)) {
        const dataToExport = cels.map((cel: any) => ({
          Cellule: cel.name,
          Pilotes: cel?.persons
            ?.filter((p: any) => p.isPilote == true)
            ?.map((per: any) => per.firstname + " " + per.lastname)[0],
          Hôtes: cel.persons
            ?.filter((p: any) => p.isRespo == true)
            ?.map((per: any) => per.firstname + " " + per.lastname)[0],
          Adresse:
            cel.address.street +
            " " +
            cel.address.number +
            ", " +
            cel.address.postalCode +
            " " +
            cel.address.municipality,

          Groupe_Whatsapp: cel.grpWhatsApp,
          Statut: cel.statut,

          /*           code: pro.code,
          valuationType: pro.valuationType,
          cma: pro.cma,
          duration: pro.duration.toFixed(2),
          defProba: pro.defProba,
          refinRisk: pro.refinRisk, */
        }));
        // Create Excel workbook and worksheet
        const workbook = XLSX.utils.book_new();
        const worksheet = XLSX.utils?.json_to_sheet(dataToExport);
        XLSX.utils.book_append_sheet(workbook, worksheet, worksheetname);
        // Save the workbook as an Excel file
        XLSX.writeFile(workbook, `${title}.xlsx`);
        console.log(`Exported data to ${title}.xlsx`);
        setLoading(false);
      } else {
        setLoading(false);
        console.log("#==================Export Error");
      }
    } catch (error: any) {
      setLoading(false);
      console.log("#==================Export Error", error.message);
    }
  };
  return (
    <div className=" text-center p-4">
      <button
        onClick={() => onGetExporProduct(`Toutes_les_Cellules`, "Cellules")}
        className=""
      >
        <MdOutlineCloudDownload size={30} className="text-green-600" />
      </button>
    </div>
  );
}
