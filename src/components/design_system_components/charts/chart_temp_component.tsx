"use client";

import React from "react";
import { ChartConfig, ChartContainer , ChartTooltip, ChartTooltipContent , ChartLegend, ChartLegendContent} from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";
const chartData = [
  { date: "monday", men: 10, woman: 80 , currency:500},
  { date: "tuesday", men: 20, woman: 200 , currency:500},
  { date: "wednesday", men: 30, woman: 120 , currency:500},
  { date: "thursday", men: 40, woman: 100 , currency:500},
  { date: "friday", men: 100, woman: 100 , currency:500},
];

const chartConfig: ChartConfig = {
  men: {
    label: "Men",
    color: "hsl(var(--chart-3))",
  },
  woman: {
    label: "Woman",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig;

const ChartTempComponent = () => {
  return (
    <>
      <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
        <BarChart width={600} height={300} data={chartData}>
          <CartesianGrid vertical={false} strokeDasharray="3 3" />
          <XAxis
            dataKey="date"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <YAxis
            dataKey="currency"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
          />
          <ChartTooltip
          content={<ChartTooltipContent indicator="dashed" label="text-foreground"/>} />
          <ChartLegend content={<ChartLegendContent className="text-foreground dark:text-foreground text-md font-semibold -tracking-tighter"/>} />
          <Bar dataKey="men" fill={chartConfig.men.color} radius={4} />
          <Bar dataKey="woman" fill={chartConfig.woman.color} radius={4} />
        </BarChart>
      </ChartContainer>
    </>
  );
};

export default ChartTempComponent;
