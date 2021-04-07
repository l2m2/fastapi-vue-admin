<template>
  <div>
    <validation-observer ref="observer">
      <a-form :colon="false" layout="vertical">
        <form-builder :form="form" :shares="formShares" :config="formConfig"></form-builder>
        <a-button type="primary" @click="save">{{ $t("account.settings.basic.save") }}</a-button>
      </a-form>
    </validation-observer>
  </div>
</template>

<script>
import { useForm } from "@/use/form/form";
import uiloader from "./basic.form";
import API from "@/api";
export default {
  setup() {
    const form = useForm();
    const { formValues, setInitialFormValues, updateFormValues } = form;
    return {
      form,
      formValues,
      setInitialFormValues,
      updateFormValues
    };
  },
  data() {
    return {
      formShares: {
        size: "default",
        props: { allowClear: true }
      }
    };
  },
  mounted() {
    const { fullname, email } = this.$store.getters.userInfo;
    this.updateFormValues({ fullname, email });
  },
  computed: {
    formConfig() {
      return uiloader(this);
    }
  },
  methods: {
    async save() {
      const valid = await this.$refs.observer.validate();
      if (!valid) {
        return;
      }
      await API.users.updateUserMe(this.formValues);
      this.$message.info(this.$t("_.message.save.success"));
      this.$store.dispatch("user/getUserInfo");
    }
  }
};
</script>
