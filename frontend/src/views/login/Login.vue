<template>
  <div class="main">
    <a-form>
      <a-form-item>
        <a-input size="large" type="text" :placeholder="$t('login.username.placeholder')">
          <a-icon slot="prefix" type="user" :style="{ color: 'rgba(0,0,0,.25)' }" />
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-input-password size="large" :placeholder="$t('login.password.placeholder')">
          <a-icon slot="prefix" type="lock" :style="{ color: 'rgba(0,0,0,.25)' }" />
        </a-input-password>
      </a-form-item>
    </a-form>
    <a-form-item>
      <a-checkbox>{{ $t("login.remember-me") }}</a-checkbox>
    </a-form-item>
    <a-form-item style="margin-top:24px">
      <a-button size="large" type="primary" htmlType="submit" block>{{ $t("login.login") }}</a-button>
    </a-form-item>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped></style>
