import { z } from "zod";
import { LoginSchema } from "../schemas/login.schema";

export type FormLoginProps = z.infer<typeof LoginSchema>;
