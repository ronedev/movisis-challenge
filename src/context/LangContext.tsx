import React, { useContext, useState } from "react";
import { IntlProvider } from "react-intl";
import { useLocalStorage } from "../hooks/useLocaleStorage";
import { childrenOfProvider } from "../interfaces/interfaces";
import englishJson from "../lang/en-US.json";
import portugueseJson from "../lang/pt-BR.json";

type LangContextType = {
    changeLang: (lang:string)=>void
    actualLang: string
};

const LangContext = React.createContext({} as LangContextType);

export function useLangContext() {
  return useContext(LangContext);
}

export function LangProvider({ children }: childrenOfProvider) {
  const [lang, setLang] = useLocalStorage("lang", "en-US");
  const [langJson, setLangJson] = useState(lang === "en-US" ? englishJson : portugueseJson)

  function changeLang(lang: string){
    switch(lang){
        case 'en-US':
            setLang(lang)
            setLangJson(englishJson)
            break
        case 'pt-BR':
            setLang(lang)
            setLangJson(portugueseJson)
            break
        default:
            setLang(lang)
            setLangJson(englishJson)
            break
    }
  }

  return (
    <LangContext.Provider value={{changeLang, actualLang: lang}}>
      <IntlProvider locale={lang} messages={langJson}>
        {children}
      </IntlProvider>
    </LangContext.Provider>
  );
}
