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
//import { Address, Gi } from "@prisma/client";

type MapProps = {
  /* addresses: any;
  gis: any;
  secteurId: any; */
  cels?: any;
  haut?: any;
};

//export default function Map({ addresses, gis, secteurId }: MapProps) {
export default function Map({ cels, haut }: MapProps) {
  //console.log("Adresses", addresses);
  //console.log("secteurId", secteurId);
  //console.log("gis", gis);

  let h = haut ? haut : "500px";

  const customIcon = new Icon({
    //iconUrl: require("../../public/ic.png"),
    iconUrl: "https://cdn-icons-png.flaticon.com/128/2098/2098567.png",
    iconSize: [38, 38],
  });

  return (
    <MapContainer
      preferCanvas={true}
      center={[50.85, 4.4]}
      zoom={10}
      scrollWheelZoom={true}
      style={{ height: h, width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

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
                  {gi.address.street} {gi.address.number},{" "}
                  {gi.address.postalCode} {gi.address.municipality}
                </p>
                {gi?.persons &&
                  gi?.persons?.map((person: Person) => (
                    <p className="flex items-center gap-2" key={person.id}>
                      <FaMobileAlt /> {person.mobile} ({person.firstname})
                    </p>
                  ))}
              </Popup>{" "}
            </Marker>
          ))}
      </MarkerClusterGroup>

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
  );
}
