<template>
  <div class="main">
    <a-form :form="form" @submit="handleSubmit">
      <a-form-item>
        <a-input
          size="large"
          type="text"
          :placeholder="$t('login.username.placeholder')"
          v-decorator="[
            'username',
            {
              rules: [{ required: true, message: $t('login.username.required') }]
            }
          ]"
        >
          <a-icon slot="prefix" type="user" :style="{ color: 'rgba(0,0,0,.25)' }" />
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-input-password
          size="large"
          :placeholder="$t('login.password.placeholder')"
          v-decorator="[
            'password',
            {
              rules: [{ required: true, message: $t('login.password.required') }]
            }
          ]"
        >
          <a-icon slot="prefix" type="lock" :style="{ color: 'rgba(0,0,0,.25)' }" />
        </a-input-password>
      </a-form-item>
      <a-form-item>
        <a-checkbox>{{ $t("login.remember-me") }}</a-checkbox>
      </a-form-item>
      <a-form-item style="margin-top:24px">
        <a-button size="large" type="primary" htmlType="submit" :loading="state.loading" :disabled="state.loading" block>{{
          $t("login.login")
        }}</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      form: this.$form.createForm(this),
      state: {
        loading: false
      }
    };
  },
  methods: {
    ...mapActions("user", ["login"]),
    handleSubmit(e) {
      e.preventDefault();
      const {
        form: { validateFields },
        state,
        login
      } = this;
      state.loading = true;
      validateFields((err, values) => {
        if (!err) {
          login(values)
            .then(() => {
              this.$router.push({ path: "/" });
            })
            .finally(() => {
              state.loading = false;
            });
        } else {
          this.$nextTick(() => {
            state.loading = false;
          });
        }
      });
    }
  }
};
</script>

<style lang="less" scoped></style>
