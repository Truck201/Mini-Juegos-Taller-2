import { EN_US, ES_AR, FR_FR } from "../enums/languages";

const PROJECT_ID = "cm23nl3nl0001icradqod0htk";
let translations = null;
let language = ES_AR;
const CACHE_EXPIRATION = 3600 * 1000; // 1 hora en milisegundos

export async function getTranslations(lang, callback) {
  
  const cachedTranslations = localStorage?.getItem("translations");
  const cachedTimestamp = localStorage?.getItem("translations-timestamp");

  if (cachedTranslations && cachedTimestamp) {
    const now = Date.now();
    if (now - cachedTimestamp < CACHE_EXPIRATION) {
      translations = JSON.parse(cachedTranslations);
      console.log("Usando traducciones del caché");
      return callback ? callback() : false;
    }
  }

  // localStorage.clear();
  // translations = null;

  language = lang;
  console.log(language);
  // if (language === ES_AR) {
  //   return callback ? callback() : false;
  // }

  try {
    const response = await fetch(
      `https://cors-anywhere.herokuapp.com/https://traducila.vercel.app/api/translations/${PROJECT_ID}/${language}`
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    localStorage.setItem("translations", JSON.stringify(data));
    localStorage.setItem("translations-timestamp", Date.now()); // Almacena el tiempo de la última actualización
    console.log("Traducciones actualizadas");
    translations = data;
    if (callback) callback();
  } catch (error) {
    console.error(error);
  }
}

export function getPhrase(key) {
  if (!translations) {
    const locals = localStorage.getItem("translations");
    translations = locals ? JSON.parse(locals) : null;
  }

  let phrase = key;
  console.log(phrase);
  if (translations && translations[key]) {
    console.log(translations);
    console.log(translations[key]);
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
