import { z } from "zod";

export const CreateDriverTruckSchema = z.object({
  name: z.string().min(1, { message: "Informe o nome" }),
  lastName: z.string().min(1, { message: "Informe o sobrenome" }),
  email: z
    .string()
    .min(1, { message: "Informe o e-mail" })
    .email({ message: "Informe um e-mail válido" }),
  totalKmDriven: z
    .string()
    .min(1, { message: "Informe o quilômetros rodados" }),
  CPF: z.string().min(1, { message: "Informe o CPF" }),
  CNH: z.string().min(1, { message: "Informe o CNH" }),
});
