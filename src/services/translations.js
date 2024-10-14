import { EN_US, ES_AR, FR_FR } from "../enums/languages";

const PROJECT_ID = "cm23nl3nl0001icradqod0htk";
let translations = null;
let language = ES_AR;

export async function getTranslations(lang, callback) {
  localStorage.clear();
  translations = null;
  language = lang;
  console.log(language);
  // if (language === ES_AR) {
  //   return callback ? callback() : false;
  // }
  
  return await fetch(
    `https://cors-anywhere.herokuapp.com/https://traducila.vercel.app/api/translations/${PROJECT_ID}/${language}`
  )
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then((data) => {
    localStorage.setItem("translations", JSON.stringify(data));
    console.log("Realizado Traducciones")
    translations = data;
    if (callback) callback();
  });
}

export function getPhrase(key) {
  if (!translations) {
    const locals = localStorage.getItem("translations");
    translations = locals ? JSON.parse(locals) : null;
  }

  let phrase = key;
  console.log(phrase)
  if (translations && translations[key]) {
    console.log(translations)
    console.log(translations[key])
    phrase = translations[key];
    console.log(phrase);
  }

  return phrase;
}

function isAllowedLanguge(language) {
  const allowedLanguages = [ES_AR, EN_US, FR_FR];
  return allowedLanguages.includes(language);
}

export function getLanguageConfig() {
  let languageConfig;

  // Obtener desde la URL el idioma
  console.log(window.location.href);

  /* 
      depende como lo manejemos: 
      1) puede venir como www.dominio.com/es-AR
      2) puede venir como www.dominio.com?lang=es-AR

      En el primer caso se obtiene con: window.location.pathname
      En el segundo caso se obtiene leyendo el query param lang 
      
      vamos a implementar una logica que cubra ambos casos
    */

  const path =
    window.location.pathname !== "/" ? window.location.pathname : null;
  const params = new URL(window.location.href).searchParams;
  const queryLang = params.get("lang");

  languageConfig = path ?? queryLang;

  if (languageConfig) {
    if (isAllowedLanguge(languageConfig)) {
      return languageConfig;
    }
  }

  const browserLanguage = window.navigator.language;
  if (isAllowedLanguge(browserLanguage)) {
    return browserLanguage;
  }

  return ES_AR;
}
