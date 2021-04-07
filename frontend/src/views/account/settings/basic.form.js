export default function(self) {
  return [
    {
      fields: [
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
        }
      ]
    }
  ];
}
