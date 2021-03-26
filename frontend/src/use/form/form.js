import { reactive, toRefs } from "@vue/composition-api";
import { cloneDeep as _cloneDeep } from "lodash-es";

function useForm() {
  const state = reactive({
    initialFormValues: {},
    formValues: {}
  });

  const setInitialFormValues = function(formValues) {
    state.initialFormValues = _cloneDeep(formValues);
    state.formValues = _cloneDeep(formValues);
  };

  const updateFormValues = function(formValues) {
    console.log("updateFormValues: ", formValues);
    state.formValues = formValues;
  };

  const resetFormValues = function() {
    state.formValues = _cloneDeep(state.initialFormValues);
  };

  return {
    ...toRefs(state),

    setInitialFormValues,
    updateFormValues,
    resetFormValues
  };
}

export { useForm };
