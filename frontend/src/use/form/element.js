import { ref, watch } from "@vue/composition-api";
import { isEqual as _isEqual, cloneDeep as _cloneDeep } from "lodash-es";

function useFormElement(props, context) {
  const rules = ref({});
  const dirty = ref(false);
  const localValue = ref(null);
  const initialValue = ref(null);

  const setInitialValue = function(value) {
    initialValue.value = _cloneDeep(value);
    localValue.value = _cloneDeep(value);
    console.log("setInitialValue:", value, localValue.value);
    context.emit("input", localValue.value);
  };

  const resetLocalValue = function() {
    localValue.value = _cloneDeep(initialValue.value);
    context.emit("input", localValue.value);
  };

  const updateLocalValue = function(value) {
    console.log("updateLocalValue:", value, localValue.value);
    if (!_isEqual(value, localValue.value)) {
      dirty.value = true;
      localValue.value = _cloneDeep(value);
      context.emit("input", localValue.value);
    }
  };

  const watchPropValue = function(callback) {
    watch(
      () => props.value,
      value => {
        if (_isEqual(value, localValue.value)) {
          return;
        }
        callback(value);
      },
      {
        deep: true
      }
    );
  };

  watchPropValue(value => {
    if (!dirty.value) {
      initialValue.value = _cloneDeep(value);
    }
    localValue.value = _cloneDeep(value);
  });

  watch(
    () => props.rules,
    value => {
      rules.value = value;
    }
  );

  return {
    dirty,
    localValue,
    watchPropValue,
    setInitialValue,
    resetLocalValue,
    updateLocalValue
  };
}

export { useFormElement };
