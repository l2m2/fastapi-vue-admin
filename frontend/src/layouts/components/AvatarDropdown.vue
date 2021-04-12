<template>
  <a-dropdown placement="bottomRight">
    <span class="ant-pro-account-avatar">
      <a-avatar> {{ $store.getters.fullname.slice(-2) }} </a-avatar>
    </span>
    <template v-slot:overlay>
      <a-menu class="ant-pro-drop-down menu" :selected-keys="[]">
        <a-menu-item key="settings" @click="handleToSettings">
          <a-icon type="setting" />
          {{ $t("layouts.basic-layout.settings") }}
        </a-menu-item>
        <a-menu-divider />
        <a-menu-item key="logout" @click="handleLogout">
          <a-icon type="logout" />
          {{ $t("layouts.basic-layout.logout") }}
        </a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>
</template>

<script>
export default {
  name: "AvatarDropdown",
  methods: {
    handleToSettings() {
      this.$router.push({ path: "/account/settings" });
    },
    handleLogout() {
      this.$confirm({
        title: this.$t("layouts.basic-layout.exit-dialog.title"),
        okText: this.$t("layouts.basic-layout.exit-dialog.ok"),
        onOk: async () => {
          await this.$store.dispatch("permission/clear");
          await this.$store.dispatch("user/logout");
          this.$router.push({ name: "login" });
        }
      });
    }
  }
};
</script>
