<template>
  <div>
    <a-card :bodyStyle="{ padding: '16px 0', height: '100%' }">
      <div :class="{ mobile: isMobile }">
        <a-row type="flex">
          <a-col flex="200px">
            <a-menu :mode="isMobile ? 'horizontal' : 'inline'" :selectedKeys="selectedKeys" type="inner" style="height:100%">
              <a-menu-item key="/account/settings/basic">
                <router-link :to="{ name: 'account-basic-settings' }"> {{ $t("account.settings.basic.default") }}</router-link>
              </a-menu-item>
              <a-menu-item key="/account/settings/security">
                <router-link :to="{ name: 'account-security-settings' }"> {{ $t("account.settings.security.default") }}</router-link>
              </a-menu-item>
            </a-menu>
          </a-col>
          <a-col flex="auto">
            <div style="padding:20px 40px">
              <div class="account-settings-info-title">
                <span>{{ $t($route.meta.title) }}</span>
              </div>
              <route-view></route-view>
            </div>
          </a-col>
        </a-row>
      </div>
    </a-card>
  </div>
</template>

<script>
import { baseMixin } from "@/mixins/app.mixin";
import RouteView from "@/layouts/RouteView.vue";
export default {
  components: { RouteView },
  mixins: [baseMixin],
  data() {
    return {
      selectedKeys: []
    };
  },
  mounted() {
    this.updateMenu();
  },
  methods: {
    updateMenu() {
      const routes = this.$route.matched.concat();
      this.selectedKeys = [routes.pop().path];
    }
  },
  watch: {
    $route() {
      this.updateMenu();
    }
  }
};
</script>
<style lang="less" scoped>
.account-settings-info-title {
  color: rgba(0, 0, 0, 0.85);
  font-size: 20px;
  font-weight: 500;
  line-height: 28px;
  margin-bottom: 12px;
}
</style>
