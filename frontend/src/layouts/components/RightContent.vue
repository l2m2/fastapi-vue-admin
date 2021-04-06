<template>
  <div :class="wrpCls">
    <AvatarDropdown class="ant-pro-global-header-index-action" />
    <SelectLang class="ant-pro-global-header-index-action" />
  </div>
</template>

<script>
export default {
  name: "RightContent",
  components: {
    SelectLang: () => import("./SelectLang"),
    AvatarDropdown: () => import("./AvatarDropdown")
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
  data() {
    return {
      currentUser: {}
    };
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
