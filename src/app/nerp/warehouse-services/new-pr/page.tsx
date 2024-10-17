'use client'

import { useState, useEffect } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useFieldArray, useForm } from "react-hook-form"
import * as z from "zod"
import { Plus, Trash2 } from 'lucide-react'

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from '@/hooks/use-toast'

const productSchema = z.object({
  product_name: z.string().min(1, "Product name is required"),
  cost: z.number().min(0, "Cost must be non-negative"),
  price: z.number().min(0, "Price must be non-negative"),
  category: z.string().min(1, "Category is required"),
  branch_qty: z.number().int().min(0, "Quantity must be non-negative"),
  action: z.string(),
  sale_order_discount: z.number().min(0, "Discount must be non-negative"),
  sale_order_price: z.number().min(0, "Sale price must be non-negative"),
  sale_order_price_total: z.number().min(0, "Total price must be non-negative"),
  branch_id: z.number().int().positive("Branch ID must be positive"),
  user_id: z.number().int().positive("User ID must be positive"),
})

const formSchema = z.object({
  doc_id: z.number().int().positive("Document ID must be positive"),
  doc_status_id: z.number().int().nonnegative("Status ID must be non-negative"),
  doc_note: z.string(),
  branch_id: z.number().int().nonnegative("Branch ID must be non-negative"),
  user_id: z.number().int().positive("User ID must be positive"),
  department_id: z.number().int().positive("Department ID must be positive"),
  vendor_data: z.string(),
  doc_prefix_id: z.number().int().positive("Document Prefix ID must be positive"),
  products: z.array(productSchema),
  doc_log_action: z.string(),
  doc_log_qty: z.number().int().nonnegative("Log quantity must be non-negative"),
  doc_discount: z.number().min(0, "Document discount must be non-negative").optional(),
  ex_vat: z.number().min(0, "Ex VAT must be non-negative").optional(),
  vat: z.number().min(0, "VAT must be non-negative").optional(),
  in_vat: z.number().min(0, "In VAT must be non-negative").optional(),
})

const api = process.env.NEXT_PUBLIC_API_URL;
export default function DynamicFormWithUpdatedCalculations() {
  const {toast} = useToast();
  const [calculatedValues, setCalculatedValues] = useState({
    doc_discount: 0,
    ex_vat: 0,
    vat: 0,
    in_vat: 0,
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      doc_id: 0,
      doc_status_id: 1,
      doc_note: "",
      branch_id: 0,
      user_id: 0,
      department_id: 0,
      vendor_data: "",
      doc_prefix_id: 1,
      products: [],
      doc_log_action: "",
      doc_log_qty: 0,
      doc_discount: 0,
      ex_vat: 0,
      vat: 0,
      in_vat: 0,
    },
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "products",
  })

  const watchBranchId = form.watch("branch_id");
  const watchUserId = form.watch("user_id");
  useEffect(() => {
    fields.forEach((_, index) => {
      form.setValue(`products.${index}.branch_id`, watchBranchId);
      form.setValue(`products.${index}.user_id`, watchUserId);
    });
  }, [watchBranchId, watchUserId, fields, form]);

  const watchProducts = form.watch("products")
  useEffect(() => {
    const calculateTotals = () => {
      const totals = watchProducts.reduce(
        (acc, product) => {
          const sale_order_price = product.price || 0
          const sale_order_price_total = (product.branch_qty || 1) * sale_order_price
          
          acc.doc_discount += product.sale_order_discount || 0
          acc.ex_vat += sale_order_price * (product.branch_qty || 1)
          acc.sale_order_price_total += sale_order_price_total
          return acc
        },
        { doc_discount: 0, ex_vat: 0, sale_order_price_total: 0 }
      )

      const vat = totals.ex_vat * 0.07;
      const in_vat = totals.sale_order_price_total + vat

      setCalculatedValues({
        doc_discount: totals.doc_discount,
        ex_vat: totals.ex_vat,
        vat: vat,
        in_vat: in_vat,
      })
      form.setValue("doc_discount", totals.doc_discount)
      form.setValue("ex_vat", totals.ex_vat)
      form.setValue("vat", vat)
      form.setValue("in_vat", in_vat)
    }

    calculateTotals()
  }, [watchProducts, api])

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const resp = await fetch(`${api}/purchasing/createpurchaseorder`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        }, 
        body: JSON.stringify(values),
      });

      if (!resp.ok) {
        const errorData = await resp.json();
        throw new Error(errorData.message || "An error occurred while creating the purchase order.");
      }

      const data = await resp.json();
      if (data.status === "success") {
        toast({
          title: `${data.status}`,
          description: `${data.message}`,
          variant: "success",
        });
        form.reset()
      } else {
        toast({
          title: "Unexpected Response",
          description: `Received unexpected status: ${data.status}`,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: (error as Error).message || "An unknown error occurred.",
        variant: "destructive",
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-2xl mx-auto p-4 prm-r">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Document Identity</h2>
          <div className="grid grid-cols-5 gap-4">
          <FormField
            control={form.control}
            name="doc_prefix_id"
            render={({ field }) => (
              <FormItem >
                <FormLabel>Document</FormLabel>
                <FormControl>
                  {/* TODO - Make type as text again */}
                  <Input type="number" {...field} onChange={e => field.onChange(parseInt(e.target.value))} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
            <FormField
              control={form.control}
              name="doc_id"
              render={({ field }) => (
                <FormItem className="col-span-4">
                  <FormLabel>Number</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} onChange={e => field.onChange(parseInt(e.target.value))} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
            {/* <FormField
              control={form.control}
              name="doc_status_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Document Status ID</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} onChange={e => field.onChange(parseInt(e.target.value))} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> */}
          <div className="grid grid-cols-3 gap-4">
            <FormField
              control={form.control}
              name="branch_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Branch ID</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} onChange={e => field.onChange(parseInt(e.target.value))} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="user_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>User ID</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} onChange={e => field.onChange(parseInt(e.target.value))} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="department_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Department ID</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} onChange={e => field.onChange(parseInt(e.target.value))} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="vendor_data"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Vendor Data</FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
            <FormField
              control={form.control}
              name="doc_note"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Document Note</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Products</h2>
          {fields.map((field, index) => (
            <div key={field.id} className="border p-4 rounded-md space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name={`products.${index}.product_name`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Product Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`products.${index}.cost`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cost</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} onChange={e => field.onChange(parseFloat(e.target.value))} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`products.${index}.price`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          {...field} 
                          onChange={e => field.onChange(parseFloat(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`products.${index}.category`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`products.${index}.branch_qty`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Branch Quantity</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          {...field} 
                          onChange={(e) => {
                            const qty = parseInt(e.target.value);
                            field.onChange(qty);
                            const price = form.getValues(`products.${index}.price`);
                            form.setValue(`products.${index}.sale_order_price_total`, price * qty);
                            const cost = form.getValues(`products.${index}.cost`);
                            form.setValue(`products.${index}.sale_order_price`, cost * qty)
                          }} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* //FIXME - all id need to label it to have the string*/}
                <FormField
                  control={form.control}
                  name={`products.${index}.branch_id`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Branch ID</FormLabel>
                      <FormControl>
                        <Input 
                          type="number"
                          {...field} 
                          onChange={e => field.onChange(parseFloat(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`products.${index}.action`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Action</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`products.${index}.sale_order_discount`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sale Order Discount</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} onChange={e => field.onChange(parseFloat(e.target.value))} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`products.${index}.sale_order_price`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Total Cost</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} readOnly />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`products.${index}.sale_order_price_total`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sale Order Price Total</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} readOnly />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button type="button" variant="destructive" onClick={() => remove(index)}>
                <Trash2 className="mr-2 h-4 w-4" /> Remove Product
              </Button>
            </div>
          ))}
          <Button
            type="button"
            onClick={() => append({
              product_name: "",
              cost: 0,
              price: 0,
              category: "",
              branch_qty: 0,
              action: "",
              sale_order_discount: 0,
              sale_order_price: 0,
              sale_order_price_total: 0,
              branch_id: 0,
              user_id: 0,
            })}
          >
            <Plus className="mr-2 h-4 w-4" /> Add Product
          </Button>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Calculated Values</h2>
          <div className="grid grid-cols-2 gap-4">
            <FormItem>
              <FormLabel>Document Discount</FormLabel>
              <FormControl>
                <Input type="number" value={calculatedValues.doc_discount.toFixed(2)} readOnly />
              </FormControl>
            </FormItem>
            <FormItem>
              <FormLabel>Ex VAT</FormLabel>
              <FormControl>
                <Input type="number" value={calculatedValues.ex_vat.toFixed(2)} readOnly />
              </FormControl>
            </FormItem>
            <FormItem>
              <FormLabel>VAT (7%)</FormLabel>
              <FormControl>
                <Input type="number" value={calculatedValues.vat.toFixed(2)} readOnly />
              </FormControl>
            </FormItem>
            <FormItem>
              <FormLabel>In VAT</FormLabel>
              <FormControl>
                <Input type="number" value={calculatedValues.in_vat.toFixed(2)} readOnly />
              </FormControl>
            </FormItem>
          </div>
        
        </div>

        <div className="space-y-4">
          <FormField
            control={form.control}
            name="doc_log_action"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Document Log Action</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="doc_log_qty"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Document Log Quantity</FormLabel>
                <FormControl>
                  <Input type="number" {...field} onChange={e => field.onChange(parseInt(e.target.value))} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit">Submit Form</Button>
      </form>
    </Form>
  )
}
