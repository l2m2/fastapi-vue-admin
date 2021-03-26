<template>
  <a-config-provider :locale="locales.zhcn">
    <div id="app">
      <router-view />
    </div>
  </a-config-provider>
</template>
<script>
import zhcn from "ant-design-vue/lib/locale-provider/zh_CN";
import en from "ant-design-vue/lib/locale-provider/en_GB";

export default {
  data() {
    return {
      locales: {
        zhcn,
        en
      }
    };
  }
};
</script>

<style lang="less"></style>
