"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { MdOutlineCloudDownload } from "react-icons/md";
import * as XLSX from "xlsx";

type ExporProps = {
  opts?: any;
  code?: string;
  members: any;
  name: any;
};

export default function ExportMbr({ opts, code, members, name }: ExporProps) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  // console.log("evangs", members);

  const onGetExporProduct = async (title?: string, worksheetname?: string) => {
    try {
      setLoading(true);
      const response = await fetch("https://fakestoreapi.com/products");

      if (members && Array.isArray(members)) {
        const dataToExport = members.map((pro: any) => ({
          //  id: +pro.id,
          Prénom: pro.firstname,
          Nom: pro.lastname,
          Email: pro.email,
          Téléphone: pro.mobile,
          MembreICC: pro.isIcc,
          Star: pro.isStar,
          Pilote: pro.isPilote,
          Hôte: pro.isRespo,
          Coordinateur: pro.isGest,
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
          onGetExporProduct(`Membres_${name}`, "Membres de la cellule")
        }
        className=""
      >
        <MdOutlineCloudDownload size={30} className="text-green-600" />
      </button>
    </div>
  );
}
