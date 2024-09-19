"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const formSchema = z.object({
  product_name: z.string().min(2, {
    message: "Product name must be at least 2 characters.",
  }),
  cost: z.number().min(0),
  price: z.number().min(0),
  branch_id: z.number().int().positive(),
  total_qty: z.number().int().nonnegative(),
  action: z.string(),
  user_id: z.number().int().positive(),
  category: z.string(),
})

export default function ProductForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      product_name: "Procedure ProductStock 00",
      cost: 5,
      price: 10,
      branch_id: 9,
      total_qty: 10,
      action: "the first one SUM function is not working",
      user_id: 3,
      category: "5",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
    // Simulate API call
    setTimeout(() => {
      console.log(values)
      setIsSubmitting(false)
    }, 2000)
  }

  return (
    <div className="max-w-2xl mx-auto p-6 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-6 text-foreground dark:text-foreground">CREATE NEW PRODUCT</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="product_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-foreground dark:text-foreground">Product Name</FormLabel>
                <FormControl>
                  <Input {...field} className=" text-foreground dark:text-foreground" />
                </FormControl>
                <FormDescription className="text-foreground dark:text-foreground">
                  Enter the name of the product.
                </FormDescription>
                <FormMessage className="text-foreground dark:text-foreground" />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="cost"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground dark:text-foreground">Cost</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} onChange={(e) => field.onChange(parseFloat(e.target.value))} className=" text-foreground dark:text-foreground" />
                  </FormControl>
                  <FormMessage className="text-foreground dark:text-foreground" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground dark:text-foreground">Price</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} onChange={(e) => field.onChange(parseFloat(e.target.value))} className=" text-foreground dark:text-foreground" />
                  </FormControl>
                  <FormMessage className="text-foreground dark:text-foreground" />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="branch_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground dark:text-foreground">Branch ID</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} onChange={(e) => field.onChange(parseInt(e.target.value))} className=" text-foreground dark:text-foreground" />
                  </FormControl>
                  <FormMessage className="text-foreground dark:text-foreground" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="total_qty"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground dark:text-foreground">Total Quantity</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} onChange={(e) => field.onChange(parseInt(e.target.value))} className=" text-foreground dark:text-foreground" />
                  </FormControl>
                  <FormMessage className="text-foreground dark:text-foreground" />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="action"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-foreground dark:text-foreground">Action</FormLabel>
                <FormControl>
                  <Textarea {...field} className=" text-foreground dark:text-foreground" />
                </FormControl>
                <FormMessage className="text-foreground dark:text-foreground" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="user_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-foreground dark:text-foreground">User ID</FormLabel>
                <FormControl>
                  <Input type="number" {...field} onChange={(e) => field.onChange(parseInt(e.target.value))} className=" text-foreground dark:text-foreground" />
                </FormControl>
                <FormMessage className="text-foreground dark:text-foreground" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-foreground dark:text-foreground">Category</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className=" text-foreground dark:text-foreground">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="">
                    <SelectItem value="1" className="text-foreground dark:text-foreground">Category 1</SelectItem>
                    <SelectItem value="2" className="text-foreground dark:text-foreground">Category 2</SelectItem>
                    <SelectItem value="3" className="text-foreground dark:text-foreground">Category 3</SelectItem>
                    <SelectItem value="4" className="text-foreground dark:text-foreground">Category 4</SelectItem>
                    <SelectItem value="5" className="text-foreground dark:text-foreground">Category 5</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage className="text-foreground dark:text-foreground" />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isSubmitting} className="w-full bg-primary text-primary-foreground hover:bg-primary/90 dark:bg-primary dark:text-primary-foreground dark:hover:bg-primary/90">
            {isSubmitting ? "Submitting..." : "Submit"}
          </Button>
        </form>
      </Form>
    </div>
  )
}