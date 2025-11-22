import * as z from "zod";

export const RegistrySchema = z
  .object({
    email: z.email({ error: "Invalid email" }),
    name: z.string().min(1, { error: "Name is required" }),
    password: z.string().min(1, { error: "Password is required" }),
    confirm: z.string().min(1, { error: "Password is required" }),
  })

export const LoginSchema = z.object({
  email: z.email({ error: "Invalid email" }),
  password: z.string().min(1, { error: "Password is Required" }),
});

export const CardRegistrySchema = z.object({
  name: z.string().min(1, {error: "Card Name Required"}),
  duedate: z.string(),
})