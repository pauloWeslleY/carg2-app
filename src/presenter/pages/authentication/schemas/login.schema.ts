import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string().email({ message: "Informe um e-mail válido" }),
  password: z.string().min(1, { message: "Informe sua senha" }),
});
