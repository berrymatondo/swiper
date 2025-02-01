import Image from "next/image";
import React from "react";

import im1 from "../../public/images/cellules/uccle2.jpeg";
import im2 from "../../public/images/cellules/wsp2.jpeg";
import im3 from "../../public/images/cellules/laeken.jpeg";
import im7 from "../../public/kv.png";
import { Button } from "@/components/ui/button";
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import BulleInfo from "@/components/bulleInfo";
import { getParamByLabel } from "@/lib/_paramActions";

const testimonials = [
  {
    quote: "Itthe winter of despair.",
    name: "Pst Christian Saboukoulou",
    title: "https://www.youtube.com/watch?v=geBMa84YV70",
  },
  {
    quote: "To eoug end them: to die, to sleep.",
    name: "William Shakespeare",
    title: "Hamlet",
  },
  /*   {
    quote: "All ta dream within a dream.",
    name: "Edgar Allan Poe",
    title: "A Dream Within a Dream",
  },
  {
    quote: "It in in  be in want of a wife.",
    name: "Jane Austen",
    title: "Pride and Prejudice",
  },
  {
    quote: "Calil abry part of the world.",
    name: "Herman Melville",
    title: "Moby-Dick",
  }, */
];

const words = [
  {
    text: "Les",
  },
  {
    text: "Cellules de maison",
    className: "text-orange-500 dark:text-orange-500",
  },
  {
    text: "de",
  },

  {
    text: "dans les maisons hôtes pour s'édifier afin d'influencer leurs villes et leurs quartiers avec les valeursde Christ !",
    //  className: "text-blue-500 dark:text-blue-500",
  },
];

const NewHomePage = async () => {
  const LASTSUNDAY = await getParamByLabel("LASTSUNDAY");
  const LASTWORSHIP = await getParamByLabel("LASTWORSHIP");

  return (
    <div className="mx-auto max-md:p-2 max-w-4xl grid md:grid-cols-2 gap-2 md:gap-8 pt-8 max-md:min-h-screen">
      <div className="md:hidden p-2 gap-2 flex flex-col justify-between ">
        <Image alt="im1" src={im1} className="md:hidden rounded-xl" />
        <div className="py-8 col-span-1 container flex-1 flex flex-col justify-between items-center relative">
          <div className="text-sky-800">
            <p className="text-6xl text-center">
              Les <span className="font-bold text-orange-500">Cellules</span>
            </p>
            <p className="text-4xl text-center">
              de <span className="font-bold text-5xl">maison</span>
            </p>
          </div>
          <div className="text-neutral-600">
            <p className="text-center">
              {"Les cellules de maison sont des cellules de l'Eglise "}
              <Link
                href="https://impactcentrechretien.com"
                target="_blank"
                className="text-sky-900 font-bold italic hover:text-orange-700"
              >
                {" "}
                Impact Centre Chrétien.
              </Link>
            </p>{" "}
            <p className="text-center ">
              Les membres des cellules se réunissent{" "}
              <span className="text-sky-900 font-bold">
                tous les jeudis de 19h00 à 20h15
              </span>{" "}
              {"dans les maisons hôtes pour s'édifier "}
            </p>
            <p className="text-center">
              {
                "afin d'influencer leurs villes et leurs quartiers avec les valeurs          de Christ ! "
              }
            </p>
            <div className="bg-orange-400/20 -z-10 rounded-xl h-full absolute left-0 top-0 right-1/2 bottom-0"></div>
          </div>

          {/*         <TypewriterEffectSmooth words={words} />
           */}
          <div className="flex flex-col gap-2">
            <Label>Rejoins vite une </Label>
            <Button className="bg-orange-600 text-2xl">
              Cellule de maison
            </Button>
          </div>
        </div>
      </div>
      {/*       <TypewriterEffectSmooth words={words} />
       */}{" "}
      {/*       <div className="bg-green-400 min-h-full md:py-24 col-span-1 container flex flex-col justify-between items-center relative">
       */}{" "}
      <div className="max-md:hidden   min-h-full  col-span-1 container flex flex-col justify-between items-center relative">
        <div className="text-sky-800 w-full">
          <div className="overflow-hidden my-2 rounded-md antialiased dark:bg-black dark:bg-grid-white/[0.05] ">
            <InfiniteMovingCards
              items={testimonials}
              direction="right"
              speed="slow"
            />
          </div>{" "}
          <p className="text-6xl text-center">
            Les <span className="font-bold text-orange-500">Cellules</span>
          </p>
          <p className="text-4xl text-center">
            de <span className="font-bold text-5xl">maison</span>
          </p>
        </div>
        <div className="text-neutral-600">
          <p className="text-center">
            {"Les cellules de maison sont des cellules de l'Eglise "}
            <Link
              href="https://impactcentrechretien.com"
              target="_blank"
              className="text-orange-700 font-bold italic hover:text-sky-700"
            >
              {" Impact Centre Chrétien."}
            </Link>
          </p>{" "}
          <p className="text-center ">
            Les membres des cellules se réunissent{" "}
            <span className="text-sky-900 font-bold">
              tous les jeudis de 19h00 à 20h15
            </span>{" "}
            {" dans les maisons hôtes pour s'édifier "}
          </p>
          <p className="text-center">
            {
              "afin d'influencer leurs villes et leurs quartiers avec les valeurs             de Christ ! "
            }
          </p>
          <Image
            alt="im1"
            src={im7}
            className="opacity-40 -z-50 rounded-xl absolute left-0 top-0 bottom-0"
          />
          <div className="bg-orange-400/10 -z-10 rounded-xl h-full absolute left-0 top-0 right-1/2 bottom-0"></div>
        </div>

        {/*         <TypewriterEffectSmooth words={words} />
         */}

        <div className="flex flex-col gap-2 py-4">
          <Label className="text-sky-900 font-semibold">
            Rejoins vite une{" "}
          </Label>
          <Button className="bg-orange-600 text-2xl ">Cellule de maison</Button>
        </div>
      </div>
      <div className="max-md:hidden col-span-1 flex flex-col gap-8 relative">
        <div className="absolute right-0 top-0 bottom-0">
          <BulleInfo ls={LASTSUNDAY} lw={LASTWORSHIP} />
        </div>
        <div className=" h-48 rounded-xl overflow-hidden bg-slate-500">
          <Image alt="im1" src={im1} />
        </div>
        <div className=" h-48 rounded-xl overflow-hidden bg-slate-500">
          {" "}
          <Image alt="im1" src={im2} />
        </div>
        <div className=" h-48 rounded-xl overflow-hidden bg-slate-500">
          {" "}
          <Image alt="im1" src={im3} />
        </div>
      </div>
    </div>
  );
};

export default NewHomePage;
