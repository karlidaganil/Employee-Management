import en from './en.js';
import tr from './tr.js';

const locales = {
  en,
  tr,
};

function getCurrentLang() {
  const lang = document.documentElement.lang || 'en';
  return locales[lang] ? lang : 'en'; // fallback to English
}

export function t(key, params = {}) {
  const lang = getCurrentLang();
  const template = locales[lang]?.[key] || key;

  return template.replace(/\{\{(\w+)\}\}/g, (_, param) => {
    return params[param] ?? '';
  });
}

