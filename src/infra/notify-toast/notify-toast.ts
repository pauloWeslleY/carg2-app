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

const { toast } = createStandaloneToast({
  defaultOptions: {
    duration: 9000,
    isClosable: true,
    variant: "left-accent",
    position: "top",
    containerStyle: {
      color: "gray.900",
      _dark: { color: "gray.200" },
    },
  },
});

export class NotifyToast implements INotifyToast {
  success(message: INotifyToastParams): void {
    toast({
      title: message.title,
      description: message.description ?? null,
      status: "success",
    });
  }
  warning(message: INotifyToastParams): void {
    toast({
      title: message.title,
      description: message.description ?? null,
      status: "warning",
    });
  }
  error(message: INotifyToastParams): void {
    toast({
      title: message.title,
      description: message.description ?? null,
      status: "error",
    });
  }
}
