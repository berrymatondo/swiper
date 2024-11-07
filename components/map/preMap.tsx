"use client";
import React, { useEffect, useState } from "react";
import Map from "./map";

type PreMapProps = {
  /* addresses: any;
    gis: any;
    secteurId: any; */
  cels?: any;
  haut?: any;
  campus?: any;
  zoom?: any;
  show?: boolean;
};

const PreMap = ({ cels, haut, campus, zoom, show }: PreMapProps) => {
  const [vi, setVi] = useState(false);
  useEffect(() => {
    setVi(true);
  }, []);
  return <div>{vi && <Map cels={cels} show={show} haut={300} />}</div>;
};

export default PreMap;
