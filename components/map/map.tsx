"use client";

// START: Preserve spaces to avoid auto-sorting
import "leaflet/dist/leaflet.css";

import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css";

import "leaflet-defaulticon-compatibility";
// END: Preserve spaces to avoid auto-sorting
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { Person } from "@prisma/client";
import { FaMobileAlt } from "react-icons/fa";
import MarkerClusterGroup from "react-leaflet-cluster";
import { Icon } from "leaflet";
import Link from "next/link";
import { useState } from "react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { MdPerson } from "react-icons/md";
//import { Address, Gi } from "@prisma/client";

type MapProps = {
  /* addresses: any;
  gis: any;
  secteurId: any; */
  cels?: any;
  haut?: any;
  campus?: any;
  zoom?: any;
  show?: boolean;
};

//export default function Map({ addresses, gis, secteurId }: MapProps) {
export default function Map({ cels, haut, campus, zoom, show }: MapProps) {
  //console.log("Adresses", addresses);
  //console.log("secteurId", secteurId);
  //console.log("gis", gis);

  let h = haut ? haut : "500px";
  const [showIn, setShowIn] = useState(show);

  const customIcon = new Icon({
    //iconUrl: require("../../public/ic.png"),
    iconUrl: "https://cdn-icons-png.flaticon.com/128/2098/2098567.png",
    iconSize: [38, 38],
  });

  return (
    <div className="">
      <div className="md:hidden">
        {showIn ? (
          <p
            onClick={() => setShowIn(!showIn)}
            className="text-red-800 italic underline text-center mb-1"
          >
            Cacher la carte
          </p>
        ) : (
          <p
            onClick={() => {
              setShowIn(!showIn);
            }}
            className="text-blue-900 italic underline text-center mb-1"
          >
            Montrer la carte
          </p>
        )}

        {showIn && (
          <MapContainer
            preferCanvas={true}
            center={[50.85, 4.4]}
            // zoom={zoom ? zoom : 10}
            zoom={7}
            scrollWheelZoom={true}
            style={{ height: h, width: "100%", zIndex: 10 }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {cels && (
              <MarkerClusterGroup>
                {cels
                  ?.filter(
                    (adr: any) =>
                      //(secteurId ? gi.secteurId == secteurId : 1 == 1) && gi.address
                      adr?.address?.street
                  )
                  .map((gi: any, index: number) => (
                    <Marker
                      position={[
                        gi.address?.latitude ? +gi.address?.latitude : 0,
                        gi.address?.longitude ? +gi.address?.longitude : 0,
                      ]}
                      key={index}
                      icon={customIcon}
                    >
                      {" "}
                      <Popup>
                        <p className="text-blue-800 font-semibold">{gi.name}</p>
                        <p>
                          {/*                     {gi.address.street} {gi.address.number},{" "}
                           */}{" "}
                          {gi.address.street}, {gi.address.postalCode}{" "}
                          {gi.address.municipality}
                        </p>
                        {/*                         {gi?.persons &&
                          gi?.persons
                            ?.filter((el: any) => el.isPilote == true)
                            ?.map((person: Person) => (
                              <p
                                className="flex items-center gap-2"
                                key={person.id}
                              >
                                <MdPerson /> {person.firstname}
                              </p>
                            ))} */}
                      </Popup>{" "}
                    </Marker>
                  ))}
              </MarkerClusterGroup>
            )}

            {campus && (
              <MarkerClusterGroup>
                {campus
                  ?.filter(
                    (camp: any) =>
                      //(secteurId ? gi.secteurId == secteurId : 1 == 1) && gi.address
                      camp?.address?.street
                  )
                  .map((gi: any, index: number) => (
                    <Marker
                      position={[
                        gi.address?.latitude ? +gi.address?.latitude : 0,
                        gi.address?.longitude ? +gi.address?.longitude : 0,
                      ]}
                      key={index}
                      icon={customIcon}
                    >
                      {" "}
                      <Popup>
                        <Link
                          href="https://impactcentrechretien.com/bruxelles"
                          target="_blank"
                          className="text-blue-800 font-semibold"
                        >
                          {gi.name}
                        </Link>
                        <p>
                          {/*                     {gi.address.street} {gi.address.number},{" "}
                           */}{" "}
                          {gi.address.street}, {gi.address.postalCode}{" "}
                          {gi.address.municipality}
                        </p>
                        {/*                 {gi?.persons &&
                  gi?.persons?.map((person: Person) => (
                    <p className="flex items-center gap-2" key={person.id}>
                      <FaMobileAlt /> {person.mobile} ({person.firstname})
                    </p>
                  ))} */}
                      </Popup>{" "}
                    </Marker>
                  ))}
              </MarkerClusterGroup>
            )}

            {/*       <Marker position={[50.84583, 4.40235]}>
        <Popup>
          <p>{"Rue des lutins 8, 1190 Forest "}</p>
          <p>
            <strong>Brenda: +32 489 45 67 65</strong>
          </p>
        </Popup>
      </Marker>
      <Marker position={[50.80353101768006, 4.315487128376181]}>
        <Popup>
          <p>{"Rue Frans Hals 152, 1070 Anderlecht "}</p>
          <p>
            {" "}
            <strong>Djedou: +32 489 45 67 65</strong>.
          </p>
        </Popup>
      </Marker> */}
          </MapContainer>
        )}
      </div>
      <div className="max-md:hidden">
        <MapContainer
          preferCanvas={true}
          center={[50.85, 4.4]}
          //zoom={zoom ? zoom : 10}
          zoom={8}
          scrollWheelZoom={true}
          style={{ height: h, width: "100%" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {cels && (
            <MarkerClusterGroup>
              {cels
                ?.filter(
                  (adr: any) =>
                    //(secteurId ? gi.secteurId == secteurId : 1 == 1) && gi.address
                    adr?.address?.street
                )
                .map((gi: any, index: number) => (
                  <Marker
                    position={[
                      gi.address?.latitude ? +gi.address?.latitude : 0,
                      gi.address?.longitude ? +gi.address?.longitude : 0,
                    ]}
                    key={index}
                    icon={customIcon}
                  >
                    {" "}
                    <Popup>
                      <p className="text-blue-800 font-semibold">{gi.name}</p>
                      <p>
                        {/*                     {gi.address.street} {gi.address.number},{" "}
                         */}{" "}
                        {gi.address.street}, {gi.address.postalCode}{" "}
                        {gi.address.municipality}
                      </p>
                      {/*                       {gi?.persons &&
                        gi?.persons?.map((person: Person) => (
                          <p
                            className="flex items-center gap-2"
                            key={person.id}
                          >
                            <FaMobileAlt /> {person.mobile} ({person.firstname})
                          </p>
                        ))} */}
                    </Popup>{" "}
                  </Marker>
                ))}
            </MarkerClusterGroup>
          )}

          {campus && (
            <MarkerClusterGroup>
              {campus
                ?.filter(
                  (camp: any) =>
                    //(secteurId ? gi.secteurId == secteurId : 1 == 1) && gi.address
                    camp?.address?.street
                )
                .map((gi: any, index: number) => (
                  <Marker
                    position={[
                      gi.address?.latitude ? +gi.address?.latitude : 0,
                      gi.address?.longitude ? +gi.address?.longitude : 0,
                    ]}
                    key={index}
                    icon={customIcon}
                  >
                    {" "}
                    <Popup>
                      <Link
                        href="https://impactcentrechretien.com/bruxelles"
                        target="_blank"
                        className="text-blue-800 font-semibold"
                      >
                        {gi.name}
                      </Link>
                      <p>
                        {/*                     {gi.address.street} {gi.address.number},{" "}
                         */}{" "}
                        {gi.address.street}, {gi.address.postalCode}{" "}
                        {gi.address.municipality}
                      </p>
                      {/*                 {gi?.persons &&
                  gi?.persons?.map((person: Person) => (
                    <p className="flex items-center gap-2" key={person.id}>
                      <FaMobileAlt /> {person.mobile} ({person.firstname})
                    </p>
                  ))} */}
                    </Popup>{" "}
                  </Marker>
                ))}
            </MarkerClusterGroup>
          )}

          {/*       <Marker position={[50.84583, 4.40235]}>
        <Popup>
          <p>{"Rue des lutins 8, 1190 Forest "}</p>
          <p>
            <strong>Brenda: +32 489 45 67 65</strong>
          </p>
        </Popup>
      </Marker>
      <Marker position={[50.80353101768006, 4.315487128376181]}>
        <Popup>
          <p>{"Rue Frans Hals 152, 1070 Anderlecht "}</p>
          <p>
            {" "}
            <strong>Djedou: +32 489 45 67 65</strong>.
          </p>
        </Popup>
      </Marker> */}
        </MapContainer>
      </div>
    </div>
  );
}
