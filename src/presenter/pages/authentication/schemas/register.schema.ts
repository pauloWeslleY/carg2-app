import { z } from "zod";

export const RegisterSchema = z.object({
  name: z.string().min(1, { message: "Informe seu nome" }),
  lastName: z.string().min(1, { message: "Informe seu sobrenome" }),
  email: z.string().email({ message: "Informe um e-mail válido" }),
  password: z
    .string()
    .min(6, { message: "Sua senha deve conter 6 caracteres" }),
});
