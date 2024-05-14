"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

// Components Import
import { Input } from "./ui/input";
import { Button } from "@/components/ui/button";
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
  } from "@/components/ui/select"
import { APIEndpoint } from "@/utils/api";

import { CROP_TYPES } from "@/utils/globals";

const ChangeCropForm = () => {

    const formSchema = z.object({
        croptype: z.string().min(1, {
          message: "This field is required.",
        }),
        quantity: z.coerce.number().gt(0, {
          message: "This field is required.",
        }),
      });
    
      const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
          croptype: "",
          quantity: 0,
        },
      });

      const onSubmit = (data) =>{
        const cropAPI = new APIEndpoint();
        cropAPI
        .post("crop_data/", data)
        .then((res) => {
            console.log(res);
        })
        .catch((err) => console.log(err));
      }

    return ( 
        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <h4 className="text-lg font-bold">Change Crop Type</h4>
          <div className="flex flex-row flex-wrap items-end gap-5 px-1">
            <FormField
                control={form.control}
                name="croptype"
                render={({ field }) => (
                <FormItem className="w-52">
                    {/* <FormLabel>Crop</FormLabel> */}
                    <FormMessage />
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                        <SelectTrigger>
                        <SelectValue placeholder="Select a crop type" />
                        </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                        {CROP_TYPES.map(croptype=>(
                            <SelectItem value={croptype}>{croptype}</SelectItem>
                        ))}
                    </SelectContent>
                    </Select>
                    
                </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="quantity"
                render={({ field }) => (
                <FormItem className="w-52">
                    {/* <FormLabel>Quantity</FormLabel> */}
                    <FormMessage />
                    <FormControl>
                    <Input placeholder="Quantity" {...field} />
                    </FormControl>
                    
                </FormItem>
                )}
            />
            <Button className="mt-auto" type="submit">
                Change Crop
            </Button>
          </div>
          
        </form>
      </Form> 
     );
}
 
export default ChangeCropForm;