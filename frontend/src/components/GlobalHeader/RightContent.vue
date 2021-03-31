<template>
  <div :class="wrpCls">
    <SelectLang class="ant-pro-global-header-index-action" />
  </div>
</template>

<script>
export default {
  name: "RightContent",
  components: {
    SelectLang: () => import("@/components/SelectLang/SelectLang")
  },
  props: {
    isMobile: {
      type: Boolean,
      default: () => false
    },
    topMenu: {
      type: Boolean,
      required: true
    },
    theme: {
      type: String,
      required: true
    }
  },
  computed: {
    wrpCls() {
      return {
        "ant-pro-global-header-index-right": true,
        [`ant-pro-global-header-index-${this.isMobile || !this.topMenu ? "light" : this.theme}`]: true
      };
    }
  }
};
</script>
