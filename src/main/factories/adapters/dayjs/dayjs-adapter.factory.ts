import { DayJsAdapter, IDayJsAdapter } from "@/infra/adapters";

export const makeDayJsAdapter = (): IDayJsAdapter => new DayJsAdapter();
