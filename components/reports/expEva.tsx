"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { MdOutlineCloudDownload } from "react-icons/md";
import * as XLSX from "xlsx";

type ExporProps = {
  opts?: any;
  code?: string;
  evangs: any;
  name: any;
};

export default function ExportEva({ opts, code, evangs, name }: ExporProps) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  //console.log("evangs", evangs);

  const onGetExporProduct = async (title?: string, worksheetname?: string) => {
    try {
      setLoading(true);
      const response = await fetch("https://fakestoreapi.com/products");

      if (evangs && Array.isArray(evangs)) {
        const dataToExport = evangs.map((pro: any) => ({
          //  id: +pro.id,
          date: pro.date,
          lieu: pro.place,
          Début: pro.start,
          Fin: pro.end,
          Participants: pro.nPar,
          Evangélisées: pro.nEva,
          Gagnées: pro.nGag,
          Contacts: pro.nCon,
          Invités: pro.nInv,
          Venus: pro.nVen,
          Notes: pro.notes,
        }));
        const workbook = XLSX.utils.book_new();
        const worksheet = XLSX.utils?.json_to_sheet(dataToExport);
        XLSX.utils.book_append_sheet(workbook, worksheet, worksheetname);
        XLSX.writeFile(workbook, `${title}.xlsx`);
        //console.log(`Exported data to ${title}.xlsx`);
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
        onClick={() =>
          onGetExporProduct(`Evangélisation_${name}`, "Sorties Evangélisation")
        }
        className=""
      >
        <MdOutlineCloudDownload size={30} className="text-green-600" />
      </button>
    </div>
  );
}
