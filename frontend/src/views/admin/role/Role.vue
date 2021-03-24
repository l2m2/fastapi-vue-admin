<template>
  <div>
    <a-card :title="$t('role.list-card-title')" :bordered="false" :bodyStyle="{ padding: 0 }">
      <div slot="extra">
        <a-button type="primary" @click="editItem()">{{ $t("_.action.new") }}</a-button>
        <a-divider type="vertical"></a-divider>
        <a-space>
          <a-tooltip>
            <template slot="title">
              {{ $t("_.action.reload") }}
            </template>
            <a-icon type="reload" :style="{ fontSize: '16px' }" @click="getDataFromApi" />
          </a-tooltip>
          <a-tooltip>
            <template slot="title">
              {{ $t("_.action.columns-setting") }}
            </template>
            <a-icon type="setting" :style="{ fontSize: '16px' }" />
          </a-tooltip>
        </a-space>
        <a-divider type="vertical"></a-divider>
        <a-auto-complete></a-auto-complete>
      </div>
      <a-table
        :columns="columns"
        :row-key="record => record.id"
        :data-source="items"
        :pagination="pagination"
        :loading="loading"
        @change="handleTableChange"
      >
        <template slot="action" slot-scope="text, record">
          <a-space>
            <a @click="editItem(record)">{{ $t("_.action.edit") }}</a>
            <a @click="deleteItem(record)">{{ $t("_.action.delete") }}</a>
          </a-space>
        </template>
      </a-table>
      <a-modal v-model="modalVisible" :title="editedItem.id ? $t('_.action.edit') : $t('_.action.new')" @ok="save">
        <validation-observer ref="observer">
          <a-form :colon="false" :label-col="{ span: 4 }" :wrapper-col="{ span: 16 }">
            <form-builder :form="form" :shares="formShares" :config="formConfig"></form-builder>
          </a-form>
        </validation-observer>
      </a-modal>
    </a-card>
  </div>
</template>

<script>
import { useForm } from "@fext/vue-use";
import dataTableMixin from "@/mixins/data-table.mixin";
import API from "@/api";
import uiloader from "./detail.form";
import config from "./module.config";
export default {
  mixins: [dataTableMixin],
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
      listApi: API.roles.readRoles,
      formShares: {
        size: "default",
        props: { allowClear: true }
      },
      modalVisible: false,
      editedItem: {}
    };
  },
  computed: {
    columns() {
      return config.columns(this);
    },
    formConfig() {
      return uiloader(this);
    }
  },
  watch: {
    modalVisible(val) {
      val || this.closeModal();
    }
  },
  async mounted() {
    this.sorter = Object.assign({}, config.defaultSorter);
    await this.getDataFromApi();
  },
  methods: {
    editItem(item = config.defaultItem) {
      this.editedItem = Object.assign({}, item);
      this.modalVisible = true;
      this.$nextTick(() => {
        this.updateFormValues(this.editedItem);
      });
    },
    deleteItem(item) {
      let self = this;
      this.editedItem = Object.assign({}, item);
      this.$confirm({
        title: this.$t("_.dialog.delete.title"),
        content: this.$t("_.dialog.delete.content"),
        okType: "danger",
        okText: this.$t("_.dialog.delete.ok"),
        cancelText: this.$t("_.dialog.delete.cancel"),
        async onOk() {
          await API.roles.deleteRole(self.editedItem.id);
          await self.getDataFromApi();
        }
      });
    },
    closeModal() {
      this.modalVisible = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, config.defaultItem);
      });
    },
    async save() {
      const valid = await this.$refs.observer.validate();
      if (!valid) {
        return;
      }
      if (this.editedItem.id) {
        await API.roles.updateRole(this.editedItem.id, this.editedItem);
      } else {
        await API.roles.createRole(this.editedItem);
      }
      await this.getDataFromApi();
      this.closeModal();
    }
  }
};
</script>
