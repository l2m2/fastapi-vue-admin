export default function(self) {
  return [
    {
      fields: [
        {
          name: "current_password",
          component: "ant-form-adaptor",
          label: self.$t("account.settings.security.current-password"),
          extend: {
            component: "a-input-password"
          },
          rules: "required"
        },
        {
          name: "new_password",
          component: "ant-form-adaptor",
          label: self.$t("account.settings.security.new-password"),
          extend: {
            component: "a-input-password"
          },
          rules: "alpha_num|min:6|max:16"
        },
        {
          name: "new_password_2",
          component: "ant-form-adaptor",
          label: self.$t("account.settings.security.new-password-again"),
          extend: {
            component: "a-input-password"
          },
          rules: "confirmed:new_password"
        }
      ]
    }
  ];
}
