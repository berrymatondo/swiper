"use client";
import React from "react";

type ParamFormProps = {
  paramList: any;
};
const ParamForm = ({ paramList }: ParamFormProps) => {
  console.log("ParamList", paramList);

  return (
    <div>
      {paramList.map((pr: any) => (
        <div key={pr.label}>
          {pr.label} - {pr.value1}
        </div>
      ))}
    </div>
  );
};

export default ParamForm;
