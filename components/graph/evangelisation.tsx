"use client";
import React from "react";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Badge } from "../ui/badge";
export const description = "A multiple bar chart";

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
  cellule: {
    label: "Cellule",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig;

type EvangelisationGraphProps = {
  meetings?: any;
  cellules: any;
  persons: any;
  data: any;
};
const EvangelisationGraph = ({
  meetings,
  cellules,
  persons,
  data,
}: EvangelisationGraphProps) => {
  return (
    <div>
      <EvaGraph data={data} />
    </div>
  );
};

export default EvangelisationGraph;

type EvaGraphProps = {
  data: any;
};
export const EvaGraph = ({ data }: EvaGraphProps) => {
  //  console.log("data", data);

  const date = new Date();
  return (
    <Card>
      <CardHeader>
        <CardTitle>Statistiques</CardTitle>
        <CardDescription>
          <span>
            {date.toISOString().split("T")[0].split("-").reverse().join("-")}
          </span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Badge className="mr-1 bg-[hsl(var(--chart-1))]">Evangélisées</Badge>
        {/*         <Badge className="mr-1 bg-[hsl(var(--chart-3))]">Nbr Rapports</Badge>
         */}{" "}
        <Badge className="bg-[hsl(var(--chart-2))]">Ames gagnées</Badge>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={data}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="dateout"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              // tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar
              dataKey="evangelisees"
              fill="var(--color-cellule)"
              radius={4}
            />
            <Bar dataKey="nbrRap" fill="var(--color-desktop)" radius={4} />
            <Bar dataKey="gagnees" fill="var(--color-mobile)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Evolution mensuelle du nombre de cellules et des participations{" "}
          <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Stats des 6 derniers mois
        </div>
      </CardFooter>
    </Card>
  );
};
