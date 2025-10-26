"use client";
import CardWrapper from "@/components/CardWrapper";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RegistrySchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import { hashSync } from "bcrypt-ts";
import * as z from "zod";

const SECRET = process.env.NEXTAUTH_SECRET;

function Register() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const router = useRouter();

  const form = useForm<z.infer<typeof RegistrySchema>>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirm: "",
    },
    resolver: zodResolver(RegistrySchema),
  });
  const onSubmit = (formdata: z.infer<typeof RegistrySchema>) => {
    const headerOptions = {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        ...formdata,
        password: hashSync(formdata.password, SECRET),
        confirm: hashSync(formdata.password, SECRET),
      }),
    };
    setError(null);
    setSuccess(null);
    startTransition(() => {
      fetch("/api/user/?method=registry", headerOptions)
        .then(async (data: any) => {
          let res = await data.json();
          if (res.error) {
            throw new Error("500 - Internal Server Error");
          } else if (res.success) {
            toast("Usuario Criado", {
              onClose: () => router.push("/"),
              delay: 3000,
            });
            setSuccess(res.success);
          }
        })
        .catch((error) => {
          setError(error);
        });
    });
  };
  return (
    <section className="flex h-full w-full">
      <div className="flex m-auto w-1/2 h-auto">
        <CardWrapper
          headerLabel="New User"
          key={"create_user"}
          showButtons={false}
        >
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex flex-col space-y-4 h-full w-full">
                <FormField
                  name="name"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="text"
                          required
                          placeholder="Name"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="email"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel> Email </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="email"
                          placeholder="example@email.com"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="password"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="password"
                          placeholder="******"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="confirm"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <Input {...field} type="password" placeholder="*****" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex w-full justify-center">
                  <Button
                    className="bg-blue-100"
                    type="submit"
                    variant={"secondary"}
                    disabled={!form.formState.isValid}
                  >
                    Register
                  </Button>
                </div>
              </div>
            </form>
          </Form>
        </CardWrapper>
      </div>
      <ToastContainer />
    </section>
  );
}
export default Register;
