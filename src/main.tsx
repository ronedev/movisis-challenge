import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "../theme";
import { ShoppingCartProvider } from "./context/ShoppingCartContext";
import { ItemsContextProvider } from "./context/ItemsContext";
import { LangProvider } from "./context/LangContext";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ItemsContextProvider>
      <ShoppingCartProvider>
        <LangProvider>
          <BrowserRouter>
            <ChakraProvider theme={theme}>
              <App />
            </ChakraProvider>
          </BrowserRouter>
        </LangProvider>
      </ShoppingCartProvider>
    </ItemsContextProvider>
  </React.StrictMode>
);
