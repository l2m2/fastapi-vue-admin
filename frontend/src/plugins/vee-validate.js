import Vue from "vue";
import { ValidationProvider, ValidationObserver, configure } from "vee-validate/dist/vee-validate.full";
import i18n from "./i18n";

Vue.component("ValidationProvider", ValidationProvider);
Vue.component("ValidationObserver", ValidationObserver);

configure({
  // this will be used to generate messages.
  defaultMessage: (field, values) => {
    return i18n.t(`_.validations.${values._rule_}`, values);
  }
});
