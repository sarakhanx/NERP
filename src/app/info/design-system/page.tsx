"use client";
import React from "react";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ChartTempComponent from "@/components/design_system_components/charts/chart_temp_component";
import AreaTempChart from "@/components/design_system_components/charts/area_temp_chart";
import { Button } from "@/components/ui/button";
import HeaderAndParagraph from "@/components/design_system_components/text/header_text";
import CardAndFlex from "@/components/design_system_components/card_flexbox/CardAndFlex";
import { getCookie } from "cookies-next";

{
  /*NOTE - FAKE - DATA */
}

const debug = async () => {
  const token = getCookie("token");
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/debug-user`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    cache: "no-store",
    method: "GET",
  });
  const data = await res.json();
  console.log(data);
  console.log(token);
}
export default function Page() {
  return (<>
  <Button onClick={debug}>Debug</Button>
    <div className="space-y-4">
      {/* EXPLAIN - Header and Paragraph */}
    <HeaderAndParagraph />
      {/* EXPLAIN - Flex and Card */}
    <CardAndFlex/>
      
      
      <div className="flex flex-col justify-between gap-4"> 
      <h3 className="text-foreground dark:text-foreground text-4xl font-semibold p-2 text-center">
        Simple Charts
      </h3>
      <div className="flex justify-between">
      <ChartTempComponent />
      <AreaTempChart />
      </div>
      </div>
    </div>
    </> );
}
