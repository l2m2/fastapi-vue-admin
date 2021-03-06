<template>
  <validation-provider :rules="rules" v-slot="{ errors }" :vid="name" :name="label">
    <a-form-item :size="size" :required="isRequired" :validateStatus="errors.length ? 'error' : null" :help="errors[0]" :extra="tip">
      <template v-slot:label>
        <span>{{ label }}</span>
        <span v-if="tooltip_visible">
          <a-tooltip :title="tooltip" placement="top">
            <a-icon type="question-circle" />
          </a-tooltip>
        </span>
      </template>
      <component v-if="isSelect" :is="component" v-bind="props" :value="localValue" @change="updateAntLocalValue">
        <a-select-option v-for="item in items" :key="item.value" :value="item.value">
          {{ item.text }}
        </a-select-option>
      </component>
      <component v-else-if="isRadio" :is="component" v-bind="props" :value="localValue" @change="updateAntLocalValue">
        <a-radio v-for="item in items" :key="item.value" :value="item.value">
          {{ item.text }}
        </a-radio>
      </component>
      <component v-else-if="isCheckbox" :is="component" v-bind="props" :value="localValue" @change="updateAntLocalValue">
        <a-checkbox v-for="item in items" :key="item.value" :value="item.value">
          {{ item.text }}
        </a-checkbox>
      </component>
      <component
        v-else-if="isSwitch"
        :is="component"
        v-bind="props"
        :value="localValue"
        :checked="localValue"
        @change="updateAntLocalValue"
      >
      </component>
      <component v-else :is="component" v-bind="props" :value="localValue" @change="updateAntLocalValue"> </component>
    </a-form-item>
  </validation-provider>
</template>

<script>
import { useFormElement } from "@/use/form/element";

export default {
  name: "ant-form-adaptor",

  props: {
    tip: String,
    tooltip_visible: {
      type: Boolean,
      default: false
    },
    tooltip: String,
    name: String,
    size: {
      type: String,
      default: "default"
    },
    label: String,
    rules: {
      type: [String, Object]
    },
    value: {
      required: false
    },
    props: {
      type: Object,
      default() {
        return {};
      },
      required: false
    },
    items: {
      type: Array,
      default() {
        return [];
      },
      required: false
    },
    extend: {
      type: Object,
      default() {
        return {};
      }
    },
    metadata: {
      type: Object,
      default() {
        return {};
      }
    },
    formValues: {
      type: Object,
      required: false
    }
  },

  setup(props, context) {
    const { dirty, localValue, setInitialValue, updateLocalValue } = useFormElement(props, context);
    return {
      dirty,
      localValue,
      setInitialValue,
      updateLocalValue
    };
  },

  data() {
    return {};
  },

  computed: {
    isRequired() {
      const { rules = {} } = this;
      return typeof rules === "string" ? rules.includes("required") : rules.required;
    },

    component() {
      return this.extend.component || "a-input";
    },

    isSelect() {
      return this.component === "a-select";
    },

    isMultipleSelect() {
      return this.isSelect && this.props.mode === "multiple";
    },

    isRadio() {
      return this.component === "a-radio-group";
    },

    isCheckbox() {
      return this.component === "a-checkbox-group";
    },

    isSwitch() {
      return this.component === "a-switch";
    }
  },

  created() {
    const { localValue, isMultipleSelect, isCheckbox } = this;
    if (localValue === null) {
      if (isMultipleSelect || isCheckbox) {
        this.setInitialValue([]);
      }
    }
  },

  methods: {
    updateAntLocalValue(source) {
      if (source.target) {
        this.updateLocalValue(source.target.value);
      } else {
        this.updateLocalValue(source);
      }
    }
  }
};
</script>
