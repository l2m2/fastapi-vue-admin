<template>
  <div>
    <a-card :title="$t('user.list-card-title')" :bordered="false" :bodyStyle="{ padding: 0 }">
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
        <template slot="is_active" slot-scope="is_active">
          <a-tag :color="is_active ? 'green' : 'gray'">
            {{ is_active ? $t("user.enum.status.active") : $t("user.enum.status.inactive") }}
          </a-tag>
        </template>
        <template slot="is_superuser" slot-scope="is_superuser">
          <span> {{ is_superuser ? $t("user.enum.is_superuser.yes") : $t("user.enum.is_superuser.no") }} </span>
        </template>
        <template slot="roles" slot-scope="roles">
          <a-tag v-for="role in roles" :key="role">
            {{ rolesMap[role] }}
          </a-tag>
        </template>
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
import { useForm } from "@/use/form/form";
import dataTableMixin from "@/mixins/data-table.mixin";
import normalCRUDMixin from "@/mixins/normal-crud.mixin";
import API from "@/api";
import config from "./module.config";
import uiloader from "./detail.form";
export default {
  mixins: [dataTableMixin, normalCRUDMixin],
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
      listApi: API.users.readUsers,
      createApi: API.users.createUser,
      updateApi: API.users.updateUser,
      deleteApi: API.users.deleteUser,
      formShares: {
        size: "default",
        props: { allowClear: true }
      },
      config,
      uiloader,
      roles: [],
      rolesMap: {}
    };
  },
  computed: {
    roleOptions() {
      return this.roles.map(item => ({ text: item.name, value: item.id }));
    }
  },
  created() {
    this.loadRoles();
  },
  methods: {
    async loadRoles() {
      const data = await API.roles.readRoles({ skip: 0, limit: 99999, order: "name ASC" });
      this.roles = data.items;
      this.rolesMap = this.roles.reduce((prev, curr) => {
        if (!(curr.id in prev)) {
          prev[curr.id] = curr.name;
        }
        return prev;
      }, {});
    },
    async save() {
      const valid = await this.$refs.observer.validate();
      if (!valid) {
        return;
      }
      if (this.editedItem.id) {
        await API.users.updateUser(this.editedItem.id, this.editedItem);
      } else {
        await API.users.createUser(Object.assign(this.editedItem, { password: "123456" }));
      }
      await this.getDataFromApi();
      this.closeModal();
    }
  }
};
</script>
