import Image from "next/image";
import im from "../public/home.jpg";
import logoicc0 from "../public/logoicc0.png";
import Link from "next/link";
import { MdDirectionsRun, MdInfo } from "react-icons/md";
import { BiBuildingHouse } from "react-icons/bi";
import { GrUserAdmin } from "react-icons/gr";
import { Label } from "@/components/ui/label";

export default function Home() {
  return (
    <main className="relative text-white flex flex-col md:flex-row gap-10 justify-center items-center  h-screen md:px-2">
      <Image
        alt="bcg"
        src={im}
        placeholder="blur"
        quality={100}
        fill
        sizes="100vw"
        className="object-cover -z-10 "
      />
      <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-tr from-blue-900/50 to-black/50 -z-5"></div>
      <div className="px-2 absolute text-center flex flex-col items-center">
        <Image
          alt="home"
          src={logoicc0}
          quality={100}
          className="bg-gradient-to-tr from-yellow-600/40 to-transparent p-2 rounded-full text-center z-5 w-1/5 md:w-1/6 "
        />

        <h1 className="relative  mb-3 font-bold max-md:flex max-md:flex-col items-start mt-4">
          {" "}
          <span className="text-orange-400 absolute z-10 text-sm md:text-lg left-24 -top-4">
            Rejoins les
          </span>
          <p className="text-8xl max-md:text-6xl">
            Cellules<strong className="text-orange-400">{" d'Impact"}</strong>
          </p>
        </h1>
        <p className="font-normal md:text-xl px-4 md:px-36 xl:px-96 my-4">
          Les <strong>cellules {"d'Impact"}</strong> sont des cellules de{" "}
          {"l'Eglise "}
          <Link
            className="text-yellow-400"
            target="_blank"
            href="https://impactcentrechretien.com/"
          >
            Impact Centre Chrétien.
            <br />
          </Link>{" "}
          Les membres des cellules se {"réunissent "}
          <strong>tous les jeudis de 19h00 a 20h15 </strong>
          dans les maisons {"hôtes"} <br /> pour {"s'édifier"} et influencer
          leurs villes et leurs quartiers avec les valeurs de Christ !
        </p>
        {/*         <p className="md:text-xl px-4 md:px-36 xl:px-96">
          {
            "Trouve et rejoins rapidement une cellule de maison à proximité de chez toi"
          }
        </p>
        <p className="text-xl px-4 md:px-36 xl:px-96">
          {" et viens y servir le Seigneur avec "}{" "}
          <span className="font-semibold text-xl">IMPACT</span>
        </p> */}

        <Link href="/cellules" className="text-center p-1  mt-8 md:mt-24">
          <div className="text-lg hover:bg-gradient-to-r hover:from-red-700/80 hover:to-orange-400 bg-gradient-to-r from-red-800/80 to-orange-500 text-white py-1 px-20 rounded-full">
            {" "}
            <p className="flex justify-center font-semibold">
              {" "}
              <span className=" text-yellow-400 md:text-lg">
                <MdDirectionsRun size={30} />
              </span>{" "}
              Rejoins vite
            </p>
            <p className="block md:text-lg  font-semibold">
              {" "}
              {" une cellule d'impact !"}
            </p>
          </div>
        </Link>

        <div className=" w-full flex justify-center gap-4">
          <Link
            className="mt-24 underline hover:text-yellow-400 max-md:text-xs"
            href="/infos"
          >
            <div className="flex flex-col justify-center items-center">
              <MdInfo className="" size={30} />

              <p>{"Plus d'informations"}</p>
            </div>
          </Link>
          <Link
            href="/benelux"
            className="mt-24 underline hover:text-yellow-400 max-md:text-xs"
          >
            <div className="flex flex-col justify-center items-center">
              <BiBuildingHouse className="" size={30} />

              <p>Nos campus du Benelux</p>
            </div>
          </Link>
          <Link
            className="mt-24 underline hover:text-yellow-400 max-md:text-xs"
            href="/auth/login"
          >
            <div className="flex flex-col justify-center items-center">
              <GrUserAdmin className="" size={30} />

              <p>Espace Admin</p>
            </div>
          </Link>
        </div>
      </div>
    </main>
  );
}
