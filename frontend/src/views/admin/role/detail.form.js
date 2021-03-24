export default function(self) {
  return [
    {
      fields: [
        {
          name: "name",
          component: "ant-form-adaptor",
          label: self.$t("role.name"),
          rules: "required"
        },
        {
          name: "description",
          component: "ant-form-adaptor",
          label: self.$t("role.description"),
          extend: {
            component: "a-textarea"
          },
          props: {
            rows: 4
          }
        }
      ]
    }
  ];
}
