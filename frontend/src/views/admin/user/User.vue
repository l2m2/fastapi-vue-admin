<template>
  <div>
    <a-table
      :columns="columns"
      :row-key="record => record.id"
      :data-source="items"
      :pagination="pagination"
      :loading="loading"
      @change="handleTableChange"
    >
      <template slot="is_active" slot-scope="is_active">
        <a-tag :color="is_active ? 'green' : 'gray'"> {{ is_active ? $t("user.active") : $t("user.inactive") }} </a-tag>
      </template>
      <template slot="is_superuser" slot-scope="is_superuser">
        <a-tag :color="is_superuser ? 'green' : 'gray'"> {{ is_superuser ? $t("user.yes") : $t("user.no") }} </a-tag>
      </template>
      <template slot="action" slot-scope="text, record">
        <a class="fv-table-action-item" @click="editItem(record)">{{ $t("_.action.edit") }}</a>
        <a class="fv-table-action-item" @click="deleteItem(record)">{{ $t("_.action.delete") }}</a>
      </template>
    </a-table>
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

<style></style>
