import { ReactNode } from "react";
import {
  ChakraProvider,
  ColorModeScript,
  createStandaloneToast,
  extendTheme,
  StyleFunctionProps,
} from "@chakra-ui/react";
import { GlobalStyles } from "./global-styles";

export function ThemeCustomization({ children }: { children: ReactNode }) {
  const { ToastContainer } = createStandaloneToast();
  // const fontFamilyPoppins = `'Poppins', sans-serif`;

  const theme = extendTheme({
    config: {
      initialColorMode: "light",
      useSystemColorMode: true,
    },
    styles: {
      global: (props: StyleFunctionProps) => ({
        ...GlobalStyles,
        body: {
          bg: props.colorMode === "dark" ? "gray.800" : "whiteAlpha.200",
          color: props.colorMode === "dark" ? "green.400" : "green.700",
          fontFamily: `'Poppins', sans-serif`,
          webkitFontSmoothing: "antialiased",
          textRendering: "optimizeLegibility",
        },
      }),
    },
    fonts: {
      poppins: `'Poppins', sans-serif`,
      body: `'Poppins', sans-serif`,
    },
  });

  return (
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <ToastContainer />
      {children}
    </ChakraProvider>
  );
}
