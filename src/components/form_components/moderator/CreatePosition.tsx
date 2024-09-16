"use client";

import { Button } from "@/components/ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Maxwidth from "@/components/client_component/layout_components/Maxwidth";
import Link from "next/link";
import { HousePlus } from "lucide-react";

const departments = [
  { name: "IT", position: "IT Manager" },
  { name: "Marketing", position: "Marketing Manager" },
  { name: "Sales", position: "Sales Manager" },
  { name: "Customer Service", position: "Customer Service Manager" },
  { name: "Human Resources", position: "Human Resources Manager" },
  { name: "Finance", position: "Finance Manager" },
  { name: "Operations", position: "Operations Manager" },
  {
    name: "Research and Development",
    position: "Research and Development Manager",
  },
  { name: "Quality Assurance", position: "Quality Assurance Manager" },
];

const createDepartmentSchema = z.object({
  position: z.string().min(1),
  name: z.string({
    message: "Department is required",
    required_error: "Department is required",
  }),
});

export default function CreatePosition() {
  const form = useForm<z.infer<typeof createDepartmentSchema>>({
    resolver: zodResolver(createDepartmentSchema),
    defaultValues: {
      position: "สร้าง Position ของพนักงาน",
    },
  });

  const onSubmit = (data: z.infer<typeof createDepartmentSchema>) => {
    console.log(data);
  };
  return (
    <>
      <Maxwidth className="flex flex-col justify-center w-full items-center">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full flex flex-col justify-center items-start gap-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="text-xs prm-r text-foreground dark:text-foreground">
                    Department
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="text-xs prm-r text-foreground dark:text-foreground">
                        <SelectValue
                          className="text-xs prm-r text-foreground dark:text-foreground"
                          placeholder="Select a department"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {departments.map((department) => (
                        <SelectItem
                          className="text-xs prm-r text-foreground dark:text-foreground"
                          key={department.name}
                          value={department.name}
                        >
                          {department.name}
                        </SelectItem>
                      ))}
                      <div className="flex justify-center items-center w-full">
                      <Button
                        className="text-xs prm-r text-foreground dark:text-foregroun w-full items-baseline gap-2"
                        variant="outline"
                      >
                        <Link href="/auth/moderator/create-position/create-department">
                          สร้างแผนกใหม่
                        </Link>
                        <HousePlus size={14} strokeWidth={2.5}/>
                      </Button>
                      </div>
                    </SelectContent>
                  </Select>
                  <FormDescription className="text-xs prm-l text-muted-foreground dark:text-muted-foreground">
                    สร้างแผนกของพนักงาน
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />


            <FormField
              control={form.control}
              name="position"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="text-xs prm-r text-foreground dark:text-foreground">
                    Position Of Employee
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="text-xs prm-r text-foreground dark:text-foreground"
                    />
                  </FormControl>
                  <FormDescription className="text-xs prm-l text-muted-foreground dark:text-muted-foreground">
                    สร้างตำแหน่งของพนักงาน
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="prm-b -tracking-tighter text-xs text-foreground dark:text-foreground">สร้างใหม่ทั้งหมด</Button>
          </form>
        </Form>
      </Maxwidth>
    </>
  );
}
