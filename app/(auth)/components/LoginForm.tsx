"use client";
import CardWrapper from "@/components/CardWrapper";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { LoginSchema } from "@/schemas";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import FormError from "@/components/FormError";
import { useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const SECRET = process.env.NEXTAUTH_SECRET;

interface LoginFormProps {
  onSuccess: string;
  onError: string;
}

function LoginForm({ onSuccess, onError }: LoginFormProps) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const form = useForm<z.infer<typeof LoginSchema>>({
    defaultValues: { email: "", password: "" },
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    startTransition(() => {
      signIn("credentials", { ...values, redirect: false })
        .then((data) => {
          router.push(onSuccess);
        })
        .catch((e) => {
          router.push(onError);
          console.error(e);
        });
    });
  };

  return (
    <CardWrapper headerLabel="Welcome" showButtons>
      <div className="space-y-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex gap-4 flex-col">
              <FormField
                name="email"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        id="email"
                        {...field}
                        disabled={isPending}
                        placeholder="example@email.com"
                        type="email"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              ></FormField>
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        id="password"
                        {...field}
                        disabled={isPending}
                        placeholder="******"
                        type="password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              ></FormField>
              <FormError message="Email/password invalid" />

              <Button className="w-full" type="submit" variant={"outline"}>
                Login
              </Button>

              <Button
                className="w-full bg-blue-400"
                onClick={() => signIn("google", { redirect: true })}
              >
                Login with Google
              </Button>
            </div>
          </form>
        </Form>
        <div className="flex flex-row w-full justify-end">
          <Link href="/register">
            <span className="text-sm  underline">Create an account</span>
          </Link>
        </div>
      </div>
    </CardWrapper>
  );
}

export default LoginForm;
