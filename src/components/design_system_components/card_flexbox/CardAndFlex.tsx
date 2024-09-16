'use client'
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const cardUI = [
    {
      title: "TITLE CARD 1",
      description: "Description 1 lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi, quisquam.",
      footer: "Footer 1",
    },
    {
      title: "TITLE CARD 2",
      description: "Description 2 lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi, quisquam.",
      footer: "Footer 2",
    },
    {
      title: "TITLE CARD 3",
      description: "Description 3 lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi, quisquam.",
      footer: "Footer 3",
    },
  ];

const CardAndFlex = () =>{
    const [cardUi, setCardUi] = React.useState(cardUI);

    return (
        <>
        <div className="flex justify-between gap-4">
        <div className="flex flex-col justify-between gap-4">
      <div className="flex flex-col justify-center items-center border border-offset-2 border-foreground rounded-xl p-2 gap-4 min-h-full">
      <h3 className="text-foreground dark:text-foreground text-4xl font-semibold p-2 text-center">
      Card and Flexbox VERTICAL
      </h3>
      <div className="flex justify-center items-center p-2 gap-4">
        {cardUi.map((cd, i) => (
          <Card className="w-full text-center items-center min-h-full" key={i}>
            <CardHeader>
              <CardTitle className="text-foreground dark:text-foreground text-lg font-bold -tracking-tighter">{cd.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div>
                <p className="text-foreground dark:text-foreground text-xs prm-l -tracking-tighter">{cd.description}</p>
              </div>
              <div className="border-b border-foreground dark:border-foreground p-2"/>
            </CardContent>
            <CardFooter className="flex flex-col justify-center text-sm prm-l gap-4">
              <p className="text-xs prm-l">{cd.footer}</p>
              <Button className="prm-b text-foreground dark:text-foreground bg-chart-3 dark:bg-chart-3">SUBMIT</Button>
            </CardFooter>
          </Card>
        ))}
        </div>
      </div>
        </div>
      {/* NOTE - Horizonal card */}
      <div className="flex flex-col justify-center items-center w-full border border-offset-2 border-foreground rounded-xl p-2 gap-4">
      <h3 className="text-foreground dark:text-foreground text-4xl font-semibold p-2 text-center">
        Card and Flexbox HORIZONAL
      </h3>
        {cardUi.map((cd, i) => (
          <Card className="w-full text-center" key={i}>
            <CardHeader className="text-foreground dark:text-foreground text-2xl font-bold">
              <CardTitle>{cd.title}</CardTitle>
            </CardHeader>
            <CardContent className="text-foreground dark:text-foreground">
              <div>
                <p className="text-foreground dark:text-foreground text-xs prm-l -tracking-tighter">{cd.description}</p>
              </div>
              <div className="border-b border-foreground dark:border-foreground p-2"/>
            </CardContent>
            <CardFooter className="text-muted-foreground dark:text-muted-foreground flex flex-col justify-center text-sm prm-l gap-4">
              <p className="text-xs prm-l">{cd.footer}</p>
            <Button className="w-96 prm-b text-foreground dark:text-foreground">SUBMIT</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
        </div>
        </>
    )
}

export default CardAndFlex;