"use client";
import React from "react";

type ParamFormProps = {
  paramList: any;
};
const ParamForm = ({ paramList }: ParamFormProps) => {
  console.log("ParamList", paramList);

  return <div>paramForm</div>;
};

export default ParamForm;
