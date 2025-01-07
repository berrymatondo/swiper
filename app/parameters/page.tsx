import ParamForm from "@/components/parameters/paramForm";
import Upload from "@/components/upload";
import { getAllParameters } from "@/lib/_paramActions";
import React from "react";

const ParametersPage = async () => {
  const paramList = await getAllParameters();
  console.log("paramList ", paramList?.data);

  return (
    <div>
      <ParamForm paramList={paramList?.data} />
      {/*       <Upload />
       */}{" "}
    </div>
  );
};

export default ParametersPage;
