'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form';
import { z } from 'zod';

// Components Import
import { Input } from './ui/input';
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
import { APIEndpoint } from '@/utils/api';

const SignInForm = () => {

    const formSchema = z.object({
        username: z.string().min(1, {
            message: "This field is required.",
        }),
        password: z.string().min(1,{
            message: "This field is required."
        }),
    })

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues:{
            username: '',
            password: ''
        }
    })

    const onSubmit = (data) => {
        console.log(data)
        const loginAPI = new APIEndpoint()
        loginAPI.post('login/', data)
    }

    return ( 
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                name="password"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                        <Input placeholder="Password" type='password' {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <Button className="w-full" type="submit">Sign In</Button>
            </form>
        </Form>
     );
}
 
export default SignInForm;