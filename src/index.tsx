import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import i18next from "i18next";
import { I18nextProvider } from "react-i18next";
import common_pl from "./translations/pl/common.json";
import common_en from "./translations/en-US/common.json";
import { CartProvider } from "./contexts/CartContext";
import { UserProvider } from "./contexts/UserContext";
import intervalPlural from "i18next-intervalplural-postprocessor";

ReactDOM.render(
  <I18nextProvider i18n={i18next}>
    <UserProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </UserProvider>
  </I18nextProvider>,
  document.getElementById("root")
);

i18next.use(intervalPlural).init({
  debug: false,
  interpolation: { escapeValue: false }, // React already does escaping
  lng: localStorage.getItem("language") === "pl" ? "pl" : "en-US", // language to use
  resources: {
    en: {
      common: common_en, // 'common' is our custom namespace
    },
    pl: {
      common: common_pl,
    },
  },
});

export default i18next;

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
