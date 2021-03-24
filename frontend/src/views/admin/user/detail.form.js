export default function(self) {
  return [
    {
      fields: [
        {
          name: "username",
          component: "ant-form-adaptor",
          label: self.$t("user.username"),
          rules: "required"
        },
        {
          name: "fullname",
          component: "ant-form-adaptor",
          label: self.$t("user.fullname"),
          rules: "required"
        },
        {
          name: "email",
          component: "ant-form-adaptor",
          label: self.$t("user.email"),
          rules: "required|email"
        },
        {
          name: "is_active",
          component: "ant-form-adaptor",
          label: self.$t("user.status"),
          extend: {
            component: "a-switch"
          },
          props: {
            "checked-children": self.$t("user.enum.status.active"),
            "un-checked-children": self.$t("user.enum.status.inactive")
          }
        },
        {
          name: "is_superuser",
          component: "ant-form-adaptor",
          label: self.$t("user.superuser"),
          extend: {
            component: "a-switch"
          },
          props: {
            "checked-children": self.$t("user.enum.is_superuser.yes"),
            "un-checked-children": self.$t("user.enum.is_superuser.no")
          }
        }
      ]
    }
  ];
}
