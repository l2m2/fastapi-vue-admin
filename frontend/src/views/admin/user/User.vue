<template>
  <div>
    <a-card :title="$t('user.list-card-title')" :bordered="false" :bodyStyle="{ padding: 0 }">
      <div slot="extra">
        <a-button type="primary">{{ $t("_.action.new") }}</a-button>
        <a-divider type="vertical"></a-divider>
        <a-space>
          <a-tooltip>
            <template slot="title">
              {{ $t("_.action.reload") }}
            </template>
            <a-icon type="reload" :style="{ fontSize: '16px' }" />
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
        <template slot="action" slot-scope="text, record">
          <a-space>
            <a @click="editItem(record)">{{ $t("_.action.edit") }}</a>
            <a @click="deleteItem(record)">{{ $t("_.action.delete") }}</a>
          </a-space>
        </template>
      </a-table>
    </a-card>
  </div>
</template>

<script>
import dataTableMixin from "@/mixins/data-table.mixin";
import API from "@/api";
export default {
  mixins: [dataTableMixin],
  data() {
    return {
      listApi: API.users.readUsers
    };
  },
  computed: {
    columns() {
      return [
        {
          title: this.$t("user.username"),
          dataIndex: "username",
          sorter: true
        },
        {
          title: this.$t("user.fullname"),
          dataIndex: "fullname",
          sorter: true
        },
        {
          title: this.$t("user.email"),
          dataIndex: "email",
          sorter: true
        },
        {
          title: this.$t("user.status"),
          dataIndex: "is_active",
          scopedSlots: { customRender: "is_active" },
          sorter: true
        },
        {
          title: this.$t("user.superuser"),
          dataIndex: "is_superuser",
          scopedSlots: { customRender: "is_superuser" },
          sorter: true
        },
        {
          title: this.$t("_.action.default"),
          dataIndex: "action",
          scopedSlots: { customRender: "action" }
        }
      ];
    }
  },
  async mounted() {
    await this.getDataFromApi();
  },
  methods: {
    editItem() {},
    deleteItem() {}
  }
};
</script>
