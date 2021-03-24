const columns = function(self) {
  return [
    {
      title: self.$t("role.name"),
      dataIndex: "name",
      sorter: true
    },
    {
      title: self.$t("role.description"),
      dataIndex: "description"
    },
    {
      title: self.$t("_.action.default"),
      dataIndex: "action",
      scopedSlots: { customRender: "action" }
    }
  ];
};

const defaultItem = {
  name: "",
  description: ""
};

const defaultSorter = {
  field: "name",
  order: "ascend"
};

export default {
  columns,
  defaultItem,
  defaultSorter
};
