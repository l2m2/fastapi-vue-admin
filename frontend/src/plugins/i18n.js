import Vue from "vue";
import VueI18n from "vue-i18n";
import i18nConf from "@/locales";

Vue.use(VueI18n);

const langs = process.env.VUE_APP_LANGS.split(",");

function load(conf, lang, result) {
  for (let k in conf) {
    if (
      langs.every(item => Object.prototype.hasOwnProperty.call(conf[k], item))
    ) {
      result[k] = conf[k][lang];
    } else {
      result[k] = {};
      load(conf[k], lang, result[k]);
    }
  }
}

function loadLocaleMessages() {
  const messages = {};
  langs.forEach(lang => {
    messages[lang] = {};
    load(i18nConf, lang, messages[lang]);
  });
  return messages;
}

export default new VueI18n({
  locale: process.env.VUE_APP_I18N_LOCALE || "en",
  fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE || "en",
  messages: loadLocaleMessages()
});
