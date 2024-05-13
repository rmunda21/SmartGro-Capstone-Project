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
import { useRouter } from "next/navigation";

const SignUpForm = () => {

    const CROP_TYPES = ['Rice', 'Maize', 'Chickpea', 'Kidneybeans', 'Pigeonpeas',
    'Mothbeans', 'Mungbean', 'Blackgram', 'Lentil', 'Pomegranate',
    'Banana', 'Mango', 'Grapes', 'Watermelon', 'Muskmelon', 'Apple',
    'Orange', 'Papaya', 'Coconut', 'Cotton', 'Jute', 'Coffee']

    const router = useRouter()

  const formSchema = z.object({
    firstname: z.string().min(1, {
      message: "This field is required.",
    }),
    lastname: z.string().min(1, {
      message: "This field is required.",
    }),
    croptype: z.string().min(1, {
      message: "This field is required.",
    }),
    username: z.string().min(1, {
      message: "This field is required.",
    }),
    password: z.string().min(1, {
      message: "This field is required.",
    }),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      username: "",
      password: "",
      croptype: "",
    },
  });

  const onSubmit = (data) => {
    const registerAPI = new APIEndpoint();
    registerAPI
      .post("register/", data)
      .then((res) => {
        console.log(res);
        router.push("/dashboard/home")
      })
      .catch((err) => console.log(err));
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex flex-row gap-5">
          <FormField
            control={form.control}
            name="firstname"
            render={({ field }) => (
              <FormItem className="flex-grow">
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input placeholder="First Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastname"
            render={({ field }) => (
              <FormItem className="flex-grow">
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input placeholder="Last Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Username" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="croptype"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Crop</FormLabel>
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
              <FormDescription>
                You can change your crop type later.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="Password" type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-full" type="submit">
          Sign Up
        </Button>
      </form>
    </Form>
  );
};

export default SignUpForm;
