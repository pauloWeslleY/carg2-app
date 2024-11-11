import { z } from "zod";
import { RegisterSchema } from "../schemas/register.schema";

export type FormRegisterProps = z.infer<typeof RegisterSchema>;
