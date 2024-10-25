"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, XAxis, YAxis } from "recharts";

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

export const description = "A mixed bar chart";

const chartData = [
  { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
  { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
  { browser: "firefox", visitors: 187, fill: "var(--color-firefox)" },
  { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
  { browser: "other", visitors: 90, fill: "var(--color-other)" },
];

const chartConfig = {
  nombre: {
    label: "Nombre",
  },
  effectif: {
    label: "Effectif",
    color: "hsl(var(--chart-1))",
  },
  membreICC: {
    label: "Mbr ICC",
    color: "hsl(var(--chart-2))",
  },
  star: {
    label: "Star",
    color: "hsl(var(--chart-3))",
  },
  edge: {
    label: "Edge",
    color: "hsl(var(--chart-4))",
  },
  other: {
    label: "Other",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig;

type MbrGraphProps = {
  data: any;
};
const MbrGraphe = ({ data }: MbrGraphProps) => {
  // console.log("dna", data);

  return (
    <div>
      <PartoGraph data={data} />
    </div>
  );
};

export default MbrGraphe;

type PartoGraphProps = {
  data: any;
};
export const PartoGraph = ({ data }: PartoGraphProps) => {
  // console.log("data ", data);
  // console.log("data ", chartData);
  const date = new Date();
  return (
    <Card>
      <CardHeader>
        <CardTitle>Statistiques</CardTitle>
        <CardDescription>
          <span>
            au {date.toISOString().split("T")[0].split("-").reverse().join("-")}
          </span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={data}
            layout="vertical"
            margin={{
              left: 0,
            }}
          >
            <YAxis
              dataKey="cat"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) =>
                chartConfig[value as keyof typeof chartConfig]?.label
              }
            />
            <XAxis dataKey="nombre" type="number" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="nombre" layout="vertical" radius={5} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          {"Répartitions dans la cellule "}
          {/*           <TrendingUp className="h-4 w-4" />
           */}{" "}
        </div>
        {/*         <div className="leading-none text-muted-foreground">
          Stats des 6 derniers mois
        </div> */}
      </CardFooter>
    </Card>
  );
};
