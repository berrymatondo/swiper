"use client";
import React from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { updateParam } from "@/lib/_paramActions";

type ParamFormProps = {
  paramList: any;
};
const ParamForm = ({ paramList }: ParamFormProps) => {
  //  console.log("ParamList", paramList);

  const saveAction = (formData: FormData) => {
    // console.log("Save action label", formData.get("label"));
    // console.log("Save action valeur", formData.get("valeur"));
    const res = updateParam(
      formData.get("label") as string,
      formData.get("valeur") as string
    );
  };

  return (
    <div>
      {paramList.map((pr: any) => (
        <form
          key={pr.label}
          action={saveAction}
          className="border-2 m-2 rounded-lg p-2 flex flex-col gap-2"
        >
          <p>{pr.label}</p>
          <div>
            <Label>Valeur actuelle</Label>
            <p>{pr.value1}</p>{" "}
          </div>
          <input
            type="text"
            hidden
            name="label"
            defaultValue={pr.label}
            className="bg-red-400"
          />
          <div>
            <Label>Nouvelle valeur</Label>
            <Input
              type={pr.label == "LASTSUNDAY" ? "date" : "text"}
              name="valeur"
              className=""
            />
          </div>
          <Button type="submit">Enregister</Button>
        </form>
      ))}
    </div>
  );
};

export default ParamForm;
