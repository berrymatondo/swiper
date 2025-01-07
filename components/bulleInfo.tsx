"use client";
import React, { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import { Badge } from "./ui/badge";
import { useRouter } from "next/navigation";
import Image from "next/image";
import eva from "../public/job.jpg";
import Link from "next/link";
import { getParamByLabel } from "@/lib/_paramActions";

type BulleInfoProps = {
  ls: any;
  lw: any;
};
const BulleInfo = ({ ls, lw }: BulleInfoProps) => {
  const [close, setClose] = useState(false);
  const [close2, setClose2] = useState(false);
  const [embed2, setEmbed2] = useState<any>("");
  const [date2, setDate2] = useState<any>("");
  const [videoId, setVideoId] = useState<any>("");
  const router = useRouter();

  //const videoId = lw?.data?.value1.split("=")[1];
  //console.log("videoId", videoId);

  //const lien = "https://www.youtube.com/watch?v=" + videoId;
  //const embeded = "https://www.youtube.com/embed/" + videoId;

  useEffect(() => {
    const getParams = async () => {
      const res = await getParamByLabel("LASTWORSHIP");
      //console.log("res", res?.data?.value1?.split("=")[1]);
      setEmbed2(res?.data?.value1);
      //console.log("id", res?.data?.value1);
      const res2 = await getParamByLabel("LASTSUNDAY");
      console.log("res", res?.data?.value1?.split("=")[1]);
      setVideoId(res?.data?.value1?.split("=")[1]);
      setDate2(res2?.data?.value1);
      console.log("date", res2?.data?.value1);
    };
    getParams();
  }, []);

  return (
    <div className="flex flex-col gap-4 absolute top-2 left-2">
      {!close && (
        <div className="pt-2 rounded-xl  w-[175px] h-[200px]  bg-neutral-400/30 z-20 flex flex-col justify-between overflow-hidden">
          <div className="px-2 flex justify-between">
            <span>Dernier culte</span>
            <MdClose
              className="hover:text-red-600"
              size={25}
              onClick={() => setClose(!close)}
            />
          </div>
          <div
            className="relative flex flex-col  hover:cursor-pointer hover:bg-sky-800/90"
            /*             onClick={() =>
              window.open("https://www.youtube.com/watch?v=8sNseYPszPs&t=34s")
            } */
          >
            {/*             <Badge className="flex flex-col  bg-sky-600">
              Revoir le Culte du
              <span className="text-yellow-400 font-semibold text-sm">
                30/11/2024
              </span>
            </Badge>
            <div className="flex mt-2">
              <p className="text-center font-medium text-xs">
                {"CULTE SPECIAL DE CELEBRATION ET DE GUERISON"}
              </p>
              <div className="w-28">
                <Image
                  onClick={() => router.push("/")}
                  alt="home"
                  src={eva}
                  quality={100}
                  className=" rounded-full"
                />
              </div>
            </div>
            <p className="text-center mt-2 text-xs  font-medium text-yellow-500">
              Dr Job Mukadi
            </p> */}
            <a
              className="absolute block top-0 left-0 w-full h-full z-10 bg-transparent"
              target="_blank"
              href={embed2}
            ></a>
            <iframe
              className="w-full h-full"
              title="Revoir dernier culte"
              src={`https://www.youtube.com/embed/${videoId}`}
            />
          </div>
        </div>
      )}

      {!close2 && (
        <div className=" p-2 rounded-xl  w-[175px] max-h-[200px]  bg-neutral-400/30 z-20">
          <div className="flex items-center justify-between">
            <div className="flex flex-col  hover:cursor-pointer ">
              <Badge className="flex flex-col  bg-sky-600 hover:bg-sky-700">
                <Link
                  className="flex flex-col items-center"
                  target="_blank"
                  // href="./tmp/ICC_MON_EGLISE_20241124.pdf"
                  href="https://qrco.de/ICCMonEglise"
                >
                  <p>ICC Mon Eglise</p>
                  <span className="text-yellow-400 font-semibold text-xs">
                    {date2}
                  </span>
                </Link>
              </Badge>
            </div>

            <MdClose
              className="hover:text-red-600"
              size={25}
              onClick={() => setClose2(!close2)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default BulleInfo;
