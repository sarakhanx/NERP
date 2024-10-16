"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import { useSession } from "@/lib/custom_hooks/useSession";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  branch_name: z
    .string()
    .min(3, { message: "Branch name must be at least 3 characters" })
    .max(50, { message: "Branch name must be at most 50 characters" }),
  branch_address: z
    .string()
    .min(3, { message: "Branch address must be at least 3 characters" })
    .max(50, { message: "Branch address must be at most 50 characters" }),
});

const CreateBranchForm = () => {
  const { user, loading } = useSession();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      branch_name: "",
      branch_address: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    const api = process.env.NEXT_PUBLIC_API_URL_D;

    console.log("values in form before submit : ", values);

    const resp = await fetch(`${api}/create-branch`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(values),
    });
    if (!resp.ok) {
      toast({
        title: "Error",
        description: "Failed to create branch",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }
    const data = await resp.json();
    setTimeout(() => {
      toast({
        title: `${data.data.branch_name} was created successfully`,
        description: "Branch created successfully",
        variant: "success",
      });
      setIsSubmitting(false);
      form.reset();
    }, 1500);
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4 w-full"
        >
          <FormField
            control={form.control}
            name="branch_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Branch Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="branch_address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Branch Address</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button>{isSubmitting ? "Submitting..." : "Submit"}</Button>
        </form>
      </Form>
    </>
  );
};

export default CreateBranchForm;
