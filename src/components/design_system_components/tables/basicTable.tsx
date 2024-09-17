"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Department } from "@/lib/type";
import { Button } from "@/components/ui/button";

const BacsicTable = ({ departments, fucntion }: { departments: Department[], fucntion: (name: string) => void }) => {
  const [data, setdata] = React.useState<Department[]>([]);
  const [headerKey, setHeaderKey] = React.useState<string[]>([]);
  React.useEffect(() => {
    if (departments.length > 0) {
      const headerKey = Object.keys(departments[0]);
      setHeaderKey(headerKey);
      setdata(departments);
    }
  }, [departments]);

  return (
    <>
      <h1 className="text-2xl font-bold text-foreground dark:text-foreground">
        Basic Table
      </h1>

      <div className="flex flex-col justify-center items-center gap-4">
        <Table className="w-full prm-r">
          <TableHeader className="bg-secondary dark:bg-secondary text-foreground dark:text-foreground prm-b -tracking-tighter">
            <TableRow>
              {headerKey.map((key) => (
                <TableHead key={key}>{key}</TableHead>
              ))}
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="text-xs font-medium text-foreground dark:text-foreground">
                  {item.id}
                </TableCell>
                <TableCell className="text-xs font-medium text-foreground dark:text-foreground">
                  {item.name}
                </TableCell>
                <TableCell className="text-xs text-foreground dark:text-foreground">
                  {item.position}
                </TableCell>
                <TableCell className="text-xs text-foreground dark:text-foreground">
                  {item.member.Int64}
                </TableCell>
                <TableCell className="text-xs text-foreground dark:text-foreground">
                  {item.created_date.Valid
                    ? new Date(item.created_date.Time).toLocaleString("en-US", {
                        timeZone: "Asia/Bangkok",
                      })
                    : "N/A"}
                </TableCell>
                <TableCell className="text-xs text-foreground dark:text-foreground">
                  {item.updated_date.Valid
                    ? new Date(item.updated_date.Time).toLocaleString("en-US", {
                        timeZone: "Asia/Bangkok",
                      })
                    : "N/A"}
                </TableCell>
                <TableCell className="text-xs text-foreground dark:text-foreground">
                  <Button
                    variant="destructive"
                    onClick={() => fucntion(item.name)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              {departments.map((item) => (
                <TableCell
                  key={item.id}
                  colSpan={departments.length}
                ></TableCell>
                // NOTE -  สาเหตุที่เราลบ (-2) ก่อน ก็เพราะว่าเรายังไม่รู้ว่าอะไรติดมากับหัวมันบ้าง เพราะตอน Test มันเกินมา 2 colSpan
              ))}
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default BacsicTable;
