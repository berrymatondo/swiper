"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { MdOutlineCloudDownload } from "react-icons/md";
import * as XLSX from "xlsx";

type ExporProps = {
  opts?: any;
  code?: string;
  meetings: any;
  name: any;
};

export default function Expor({ opts, code, meetings, name }: ExporProps) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  // console.log("meeting", meetings);

  const onGetExporProduct = async (title?: string, worksheetname?: string) => {
    try {
      setLoading(true);
      const response = await fetch("https://fakestoreapi.com/products");

      if (meetings && Array.isArray(meetings)) {
        const dataToExport = meetings.map((pro: any) => ({
          //  id: +pro.id,
          date: pro.date,
          Hommes: +pro.nHom,
          Femmes: +pro.nFem,
          Enfants: pro.nEnf,
          Nouveaux: pro.nNew,
          MembresIcc: pro.nIcc,
          Star: pro.nSta,
          notes: pro.notes,
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
        onClick={() => onGetExporProduct(`Cellule_${name}`, "Cellules")}
        className=""
      >
        <MdOutlineCloudDownload size={30} className="text-green-600" />
      </button>
    </div>
  );
}
