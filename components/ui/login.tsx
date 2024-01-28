"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormLabel,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
// import { cookies } from 'next/headers'
import { setCookie } from "cookies-next";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
// import toastify
// import localstorage
// import { useCookies } from "react-cookie"
// import { useRouter } from "next/router"

export default function Login() {
  // const [cookies, setCookie] = useCookies(['data']);
  const router = useRouter();
  // const cookieStore = cookies()
  const FormSchema = z.object({
    email: z.string().min(2, {
      message: "Email must be at least 2 characters.",
    }),
    password: z.string(),
  });
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });
  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast.dismiss();
    toast.loading("Logging in", { theme: "dark" });
    axios
      .post(
        `/api/v1/auth/login`,
        {
          username: data.email,
          password: data.password,
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            accept: "application/json",
          },
        }
      )
      .then((res) => {
        setCookie("data", res.data.access_token);
        toast.dismiss();
        toast.success("Logged in", { theme: "colored" });
        router.push("/question");
      })
      .catch((error) => {
        // notify("wrong credentials")
        toast.dismiss();
        toast.error("Wrong username/password", { theme: "colored" });
        console.log(error);
      });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="sm:w-1/4 w-1/2 space-y-6 mt-10"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Leader Email</FormLabel>
              <FormControl>
                <Input placeholder="h2s@scammer.com" {...field} />
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
              <FormLabel>Team Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="w-full flex flex-row justify-end">
          <Button type="submit">Login</Button>
        </div>
      </form>
    </Form>
  );
}
