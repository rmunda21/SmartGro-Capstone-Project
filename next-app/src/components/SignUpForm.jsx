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

const SignUpForm = () => {

    const formSchema = z.object({
        firstname: z.string().min(1, {
            message: "This field is required.",
        }),
        lastname: z.string().min(1, {
            message: "This field is required.",
        }),
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
            firstname: '',
            lastname: '',
            username: '',
            password: ''
        }
    })

    const onSubmit = (data) => {
        console.log(data)
    }

    return ( 
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

                <div className='flex flex-row gap-5'>
                    <FormField
                    
                    control={form.control}
                    name="firstname"
                    render={({ field }) => (
                        <FormItem className='flex-grow'>
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                            <Input placeholder='First Name' {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={form.control}
                    name="lastname"
                    render={({ field }) => (
                        <FormItem className='flex-grow'>
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                            <Input placeholder='Last Name' {...field} />
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
                <Button className="w-full" type="submit">Sign Up</Button>
            </form>
        </Form>
     );
}
 
export default SignUpForm;