import { createStandaloneToast } from "@chakra-ui/react";

type INotifyToastParams = {
  title: string;
  description?: string;
};

export interface INotifyToast {
  success(message: INotifyToastParams): void;
  warning(message: INotifyToastParams): void;
  error(message: INotifyToastParams): void;
}

const { toast } = createStandaloneToast();

export class NotifyToast implements INotifyToast {
  success(message: INotifyToastParams): void {
    toast({
      title: message.title,
      description: message.description ?? null,
      status: "success",
      duration: 9000,
      isClosable: true,
      position: "top",
      variant: "left-accent",
      colorScheme: "green",
    });
  }
  warning(message: INotifyToastParams): void {
    toast({
      title: message.title,
      description: message.description ?? null,
      status: "warning",
      duration: 9000,
      isClosable: true,
      position: "top",
      variant: "left-accent",
      colorScheme: "yellow",
    });
  }
  error(message: INotifyToastParams): void {
    toast({
      title: message.title,
      description: message.description ?? null,
      status: "error",
      duration: 9000,
      isClosable: true,
      position: "top",
      variant: "left-accent",
      colorScheme: "red",
    });
  }
}
