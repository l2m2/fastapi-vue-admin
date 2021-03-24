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
            <a @click="setAuthority(record)">{{ $t("role.set-permissions") }}</a>
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
      <a-drawer :visible="drawerVisible" width="400" :closable="false" @close="closeDrawer">
        <template slot="title">
          <div class="drawer-header">
            <span>{{ $t("role.set-permissions") }}</span>
            <a-button type="primary" @click="saveAuthority">{{ $t("_.action.save") }}</a-button>
          </div>
        </template>
        <a-tree checkable :tree-data="permissionTreeData" :defaultExpandAll="true" :selectable="false" v-model="selectedPermissions">
        </a-tree>
      </a-drawer>
    </a-card>
  </div>
</template>

<script>
import { useForm } from "@fext/vue-use";
import dataTableMixin from "@/mixins/data-table.mixin";
import normalCRUDMixin from "@/mixins/normal-crud.mixin";
import API from "@/api";
import uiloader from "./detail.form";
import config from "./module.config";
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
      listApi: API.roles.readRoles,
      createApi: API.roles.createRole,
      updateApi: API.roles.updateRole,
      deleteApi: API.roles.deleteRole,
      formShares: {
        size: "default",
        props: { allowClear: true }
      },
      modalVisible: false,
      editedItem: {},
      config,
      uiloader,
      drawerVisible: false,
      permissionTreeData: [],
      selectedPermissions: []
    };
  },
  async created() {
    await this.loadPermissions();
  },
  methods: {
    setAuthority(item) {
      this.editedItem = Object.assign({}, item);
      this.drawerVisible = true;
    },
    closeDrawer() {
      this.drawerVisible = false;
    },
    async loadPermissions() {
      const data = await API.permissions.readPermissions();
      const self = this;
      const build = function(obj, flat, prefix) {
        for (let k in obj) {
          let _prefix = prefix.concat(k);
          if (Object.keys(obj[k]).length > 0) {
            flat.push({
              key: _prefix.join("/") + "_$dirty$", // 加上_$dirty$是为了在获取选中的权限数据时过滤掉叶子结点
              title: self.$t(["permissions"].concat(..._prefix, "default").join(".")),
              children: []
            });
            build(obj[k], flat[flat.length - 1]["children"], _prefix);
          } else {
            flat.push({
              key: _prefix.join("/"),
              title: self.$t("permissions.action." + k)
            });
          }
        }
      };
      const codes = data.items.reduce((prev, curr) => {
        const parts = curr.code.split("/");
        let dirty = prev;
        for (let i = 0; i < parts.length; i++) {
          if (!(parts[i] in dirty)) {
            dirty[parts[i]] = {};
          }
          dirty = dirty[parts[i]];
        }
        return prev;
      }, {});
      let flat = [];
      build(codes, flat, []);
      this.permissionTreeData = flat;
    },
    async saveAuthority() {
      const data = this.selectedPermissions.filter(item => !/_\$dirty\$$/.test(item));
      await API.roles.updateRolePermissionsById(this.editedItem.id, data);
      this.drawerVisible = false;
    }
  }
};
</script>
<style lang="less" scoped>
.drawer-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
