<template>
  <div>
    <a-list itemLayout="horizontal" :dataSource="data">
      <a-list-item slot="renderItem" slot-scope="item, index" :key="index">
        <a-list-item-meta>
          <a slot="title">{{ item.title }}</a>
          <span slot="description">
            <span>{{ item.description }}</span>
            <span v-if="item.value"> : </span>
            <span>{{ item.value }}</span>
          </span>
        </a-list-item-meta>
        <template v-if="item.actions">
          <a slot="actions" @click="item.actions.callback">{{ item.actions.title }}</a>
        </template>
      </a-list-item>
    </a-list>
    <a-modal v-model="modalVisible" :title="$t('account.settings.security.change-password')" @ok="changePassword">
      <validation-observer ref="observer">
        <a-form :colon="false" type="vertical">
          <form-builder :form="form" :config="formConfig"></form-builder>
        </a-form>
      </validation-observer>
    </a-modal>
  </div>
</template>

<script>
import { useForm } from "@/use/form/form";
import API from "@/api";
import uiloader from "./password-change.form";

export default {
  setup() {
    const form = useForm();
    const { formValues, updateFormValues } = form;
    return {
      form,
      formValues,
      updateFormValues
    };
  },
  data() {
    return {
      modalVisible: false
    };
  },
  computed: {
    data() {
      return [
        {
          title: this.$t("account.settings.security.password"),
          description: this.$t("account.settings.security.password-description"),
          value: "",
          actions: {
            title: this.$t("account.settings.security.modify"),
            callback: () => {
              this.modalVisible = true;
            }
          }
        }
      ];
    },
    formConfig() {
      return uiloader(this);
    }
  },
  methods: {
    async changePassword() {
      const valid = await this.$refs.observer.validate();
      if (!valid) {
        return;
      }
      await API.login.resetPassword(this.formValues);
      await this.$store.dispatch("user/logout");
      this.$router.push({ name: "login" });
      this.modalVisible = false;
    }
  }
};
</script>
