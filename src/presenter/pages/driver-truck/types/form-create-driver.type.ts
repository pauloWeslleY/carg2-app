import { z } from "zod";
import { CreateDriverTruckSchema } from "../schemas/create-driver-truck.schema";

export type FormCreateDriverProps = z.infer<typeof CreateDriverTruckSchema>;
