"use client";
import { useToast } from "@/hooks/use-toast";
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
import { getCookie } from "cookies-next";

const createDepartmentSchema = z.object({
  position: z.string().min(1),
  name: z
    .string({
      message: "Department is required",
      required_error: "Department is required",
    })
    .min(1),
});

export default function CreateDepartment() {
  const { toast } = useToast();
  const token = getCookie("token");

  const form = useForm<z.infer<typeof createDepartmentSchema>>({
    resolver: zodResolver(createDepartmentSchema),
    defaultValues: {
      name: "สร้างแผนก",
      position: "สร้าง Position ของพนักงาน",
    },
  });

  const onSubmit = async (data: z.infer<typeof createDepartmentSchema>) => {
    console.log("form data : ", data);
    console.log("token :", token);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/create-department`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });
      if(!res.ok){
        const error = await res.json();
        toast({
          title: `${error.status.toUpperCase()}`,
          description: `${error.message}`,
          variant: "destructive", 
          duration: 5000,
        });
      }
      const json = await res.json();
      toast({
        title: `${json.status}`,
        description: `${json.message}`,
        variant: "default", 
        duration: 5000,
      });

    } catch (error) {
      console.log(error)
      toast({
        title: "ERROR",
        description: "An unexpected error occurred. Please try again later.",
        variant: "destructive", 
        duration: 5000,
      });
    }
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
            <Button
              type="submit"
              className="prm-b -tracking-tighter text-xs text-foreground dark:text-foreground"
            >
              สร้างแผนกใหม่
            </Button>
          </form>
        </Form>
      </Maxwidth>
    </>
  );
}
