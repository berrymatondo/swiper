"use client";
import React, { useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import * as z from "zod";
import { dateSchema } from "@/lib/schemas";
import { Button } from "../ui/button";
import { getMeetingsByDate, getMeetingsByMonth } from "@/lib/_meetingActions";
import ExportAllMeetings from "../reports/expAllMeetings";
import MeetingItem from "./meetingItem";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";

type MeetingsByDateProps = {
  dates: any;
  usr: any;
};
const MeetingsByDate = ({ dates, usr }: MeetingsByDateProps) => {
  const [total, setTotal] = useState(0);
  const [foundMeetings, setFoundMeetings] = useState<any>([]);
  //console.log("Dates", dates);

  const form = useForm<z.infer<typeof dateSchema>>({
    resolver: zodResolver(dateSchema),
    defaultValues: {
      dateId: "",
      byMonth: false,
    },
  });

  const byMonth = form.watch("byMonth");

  const procesForm = async (values: z.infer<typeof dateSchema>) => {
    // console.log("Values", values);

    //console.log("byMonth", byMonth);

    let res;
    if (byMonth) res = await getMeetingsByMonth(values?.dateId.substring(0, 7));
    else res = await getMeetingsByDate(values?.dateId);

    //console.log("Resolved", res);

    if (res?.data) {
      /*       console.log(
        "OUR",
        res?.data?.sort((a: any, b: any) => b.cellule.name - a.cellule.name)
      ); */

      /*       const out: any = [];
      for (let i = 0; i < res?.data.length; i++) {
        out.push({ id: res?.data[i].id, name: res?.data[i]?.cellule?.name });
      }

      console.log("out: ", out);

      let out2 = [...out];
      out2 = out.sort((a, b) =>
        a.name > b.name ? 1 : b.name > a.name ? -1 : 0
      );
      console.log("ou2t: ", out2); */

      setFoundMeetings(res?.data);

      let tot = 0;
      for (let i = 0; i < res?.data.length; i++) {
        tot += res?.data[i].nHom + res?.data[i].nFem + res?.data[i].nEnf;
      }

      //console.log("TOT", tot);

      setTotal(tot);
    }

    /*     if (!res) {
      console.log("Une erreur est srvenue...");
    } */

    /*     if (res!.error) {
      console.log(res!.error);
      return;
    } */
  };

  return (
    <div className="w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(procesForm)}>
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center gap-4">
              <FormField
                control={form.control}
                name="dateId"
                render={({ field }) => {
                  return (
                    <FormItem className="w-full">
                      {/*                     <FormLabel>Cellule </FormLabel>
                       */}{" "}
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        //  disabled={celId ? true : false}
                      >
                        <SelectTrigger id="framework">
                          <SelectValue placeholder="Sélectionner une date" />
                        </SelectTrigger>
                        <SelectContent position="popper">
                          {dates?.map((date: any) => (
                            <SelectItem
                              key={date.date}
                              value={date.date.toString()}
                            >
                              {date.date.split("-").reverse().join("-")}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />

              <Button className="" type="submit">
                Charger
              </Button>
            </div>
            <div className="flex justify-center items-center">
              <FormField
                control={form.control}
                name="byMonth"
                render={({ field }) => {
                  return (
                    <FormItem className="w-1/2">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <Label className="ml-2" htmlFor="byMonth">
                        Mensuel ?
                      </Label>

                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
              {foundMeetings?.length > 0 && (
                <div className="flex items-center">
                  <div className="text-xs">
                    <p>
                      <strong>{total}</strong> part./
                      <strong>{foundMeetings?.length}</strong> cel.
                    </p>
                    <p className=" ">
                      Moy:{" "}
                      <strong>
                        {(total / foundMeetings?.length).toFixed(2)}
                      </strong>
                    </p>
                  </div>
                  <ExportAllMeetings meetings={foundMeetings} name="" />
                </div>
              )}
            </div>
          </div>
        </form>
      </Form>

      {foundMeetings
        .sort((a: any, b: any) =>
          a.cellule.name > b.cellule.name
            ? 1
            : b.cellule.name > a.cellule.name
            ? -1
            : 0
        )
        ?.map((meet: any) => (
          /*         <div>
          {fm?.cellule?.name} - {fm?.nHom + fm?.nFem + fm?.nEnf}
        </div> */

          <MeetingItem key={meet.id} meeting={meet} usr={usr} />
        ))}
    </div>
  );
};

export default MeetingsByDate;
