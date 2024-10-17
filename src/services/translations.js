import { EN_US, ES_AR, FR_FR } from '../enums/languages';

const PROJECT_ID = 'cm23nl3nl0001icradqod0htk';
let translations = null;
let language = ES_AR;
const CACHE_EXPIRATION = 3600 * 1000; // 1 hora en milisegundos

export async function getTranslations(lang, callback) {
  const cachedLanguage = localStorage?.getItem('language');
  const cachedTranslations = localStorage?.getItem('translations');
  const cachedTimestamp = localStorage?.getItem('translations-timestamp');

  // Si el idioma guardado en caché es el mismo que el seleccionado, usamos las traducciones almacenadas
  if (cachedLanguage === lang && cachedTranslations && cachedTimestamp) {
    const now = Date.now();

    // Verificamos si las traducciones en caché aún no han expirado
    if (now - cachedTimestamp < CACHE_EXPIRATION) {
      translations = JSON.parse(cachedTranslations);
      console.log('Usando traducciones del caché');
      return callback ? callback() : false;
    }
  }

  // Si el idioma es diferente al que teníamos almacenado, limpiamos el almacenamiento y pedimos nuevas traducciones
  if (cachedLanguage !== lang) {
    localStorage.clear();
    console.log(
      `Idioma cambiado de ${cachedLanguage} a ${lang}. Limpiando caché y obteniendo nuevas traducciones.`
    );
  }

  language = lang;

  // if (language === ES_AR) {
  //   return callback ? callback() : false;
  // }

  try {
    const response = await fetch(
      `https://traducila.vercel.app/api/translations/${PROJECT_ID}/${language}`
    );

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();

    localStorage.setItem('translations', JSON.stringify(data));
    localStorage.setItem('translations-timestamp', Date.now()); // Almacena el tiempo de la última actualización
    localStorage.setItem('language', lang); // Almacena el idioma seleccionado
    console.log('Traducciones Locales');

    translations = data;
    if (callback) callback();
  } catch (error) {
    console.error(error);
  }
}

export function getPhrase(key) {
  if (!translations) {
    const locals = localStorage.getItem('translations');
    translations = locals ? JSON.parse(locals) : null;
  }

  let phrase = key;
  if (translations && translations[key]) {
    phrase = translations[key];
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
    window.location.pathname !== '/' ? window.location.pathname : null;
  const params = new URL(window.location.href).searchParams;
  const queryLang = params.get('lang');

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
