<template>
  <a-dropdown :trigger="['click']">
    <icon-font type="icon-i18n" />
    <a-menu slot="overlay" v-model="current">
      <a-menu-item v-for="lang in langs" :key="lang.name" @click="changeLang(lang.name)"> {{ lang.title }}</a-menu-item>
    </a-menu>
  </a-dropdown>
</template>

<script>
import { APP_LANGUAGE } from "@/store/mutation-types";
export default {
  name: "SelectLang",
  data() {
    return {
      langs: [
        { name: "en", title: "English" },
        { name: "zhcn", title: "简体中文" }
      ],
      current: []
    };
  },
  created() {
    if (this.$store.getters.lang) {
      this.current = [this.$store.getters.lang];
    }
  },
  methods: {
    changeLang(lang) {
      this.current = [lang];
      this.$i18n.locale = lang;
      this.$store.commit(APP_LANGUAGE, lang);
    }
  }
};
</script>
