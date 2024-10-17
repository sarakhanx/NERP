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
import Maxwidth from "@/components/client_component/layout_components/Maxwidth";


const createDepartmentSchema = z.object({
  position: z.string().min(1),
  name: z.string({
    message: "Department is required",
    required_error: "Department is required",
  }).min(1),
});

export default function CreateDepartment() {
  const form = useForm<z.infer<typeof createDepartmentSchema>>({
    resolver: zodResolver(createDepartmentSchema),
    defaultValues: {
      name: "สร้างแผนก",
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
            className="w-full justify-center items-center"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs prm-r text-foreground dark:text-foreground">
                    Name Of Department
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="text-xs prm-r text-foreground dark:text-foreground"
                    />
                  </FormControl>
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
                <FormItem>
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
            <Button type="submit">Create</Button>
          </form>
        </Form>
      </Maxwidth>
    </>
  );
}
