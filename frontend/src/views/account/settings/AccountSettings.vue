<template>
  <div>
    <a-card :bodyStyle="{ padding: '16px 0', height: '100%' }">
      <div :class="{ mobile: isMobile }">
        <a-row type="flex">
          <a-col flex="200px">
            <a-menu :mode="isMobile ? 'horizontal' : 'inline'" :selectedKeys="selectedKeys" type="inner">
              <a-menu-item key="/account/settings/basic">
                <router-link :to="{ name: 'account-basic-settings' }"> {{ $t("account.settings.basic.default") }}</router-link>
              </a-menu-item>
              <a-menu-item key="/account/settings/security">
                <router-link :to="{ name: 'account-security-settings' }"> {{ $t("account.settings.security.default") }}</router-link>
              </a-menu-item>
            </a-menu>
          </a-col>
          <a-col flex="auto">
            <a-page-header :title="$t($route.meta.title)"> </a-page-header>
            <a-row>
              <route-view></route-view>
            </a-row>
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
