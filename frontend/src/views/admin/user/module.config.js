const columns = function(self) {
  return [
    {
      title: self.$t("user.username"),
      dataIndex: "username",
      sorter: true
    },
    {
      title: self.$t("user.fullname"),
      dataIndex: "fullname",
      sorter: true
    },
    {
      title: self.$t("user.email"),
      dataIndex: "email",
      sorter: true
    },
    {
      title: self.$t("user.status"),
      dataIndex: "is_active",
      scopedSlots: { customRender: "is_active" },
      sorter: true
    },
    {
      title: self.$t("user.superuser"),
      dataIndex: "is_superuser",
      scopedSlots: { customRender: "is_superuser" },
      sorter: true
    },
    {
      title: self.$t("_.action.default"),
      dataIndex: "action",
      scopedSlots: { customRender: "action" }
    }
  ];
};

const defaultItem = {
  username: "",
  fullname: "",
  email: "",
  is_active: true,
  is_superuser: false
};

const defaultSorter = {
  field: "username",
  order: "ascend"
};

export default {
  columns,
  defaultItem,
  defaultSorter
};
