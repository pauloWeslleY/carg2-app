import { INotifyToast, NotifyToast } from "@/infra/notify-toast";

export const makeNotifyToast = (): INotifyToast => new NotifyToast();
