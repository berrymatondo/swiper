"use client";
import React from "react";
import { Button } from "./ui/button";
//import html2pdf from "html2pdf.js";

const DetailedPDF = ({ idd }) => {
  const downloadPDF = async () => {
    //console.log("Téléchargement ...", idd);
    const html2pdf = await require("html2pdf.js");
    const el = document.querySelector(`#${idd}`);
    html2pdf(el, {
      margin: 20,
    });
  };

  return (
    <div>
      <Button onClick={downloadPDF}> Télécharger PDF</Button>
      <div id=""></div>
    </div>
  );
};

export default DetailedPDF;
