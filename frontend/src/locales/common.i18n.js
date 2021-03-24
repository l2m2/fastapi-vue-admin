export default {
  app: {
    name: { en: "Cute sheep", zhcn: "乖乖吃草" }
  },
  action: {
    default: { en: "Action", zhcn: "操作" },
    new: { en: "New item", zhcn: "新建" },
    delete: { en: "Delete", zhcn: "删除" },
    edit: { en: "Edit", zhcn: "编辑" },
    reload: { en: "Reload", zhcn: "刷新" },
    "columns-setting": { en: "Columns setting", zhcn: "列设置" },
    save: { en: "Save", zhcn: "保存" }
  },
  "data-footer": {
    "page-text": { en: "{0}-{1} of {2}", zhcn: "{0}-{1} 共 {2}" }
  },
  dialog: {
    delete: {
      title: { en: "Delete", zhcn: "删除" },
      content: {
        en: "Deleted items cannot be retrieved, do you want to continue?",
        zhcn: "删除的条目将无法找回，是否继续?"
      },
      ok: { en: "Delete", zhcn: "删除" },
      cancel: { en: "Cancel", zhcn: "取消" }
    }
  },
  validations: {
    alpha: { en: "The field may only contain alphabetic characters", zhcn: "该字段只能包含字母字符" },
    alpha_num: { en: "The field may only contain alpha-numeric characters", zhcn: "该字段能够包含字母数字字符、破折号和下划线" },
    alpha_dash: {
      en: "The field may contain alpha-numeric characters as well as dashes and underscores",
      zhcn: "该字段只能包含字母数字字符"
    },
    alpha_spaces: {
      en: "The field may only contain alphabetic characters as well as spaces",
      zhcn: "该字段只能包含字母字符和空格"
    },
    between: { en: "The field must be between {min} and {max}", zhcn: "该字段必须在{min}与{max}之间" },
    confirmed: { en: "The field confirmation does not match", zhcn: "该字段不能和{target}匹配" },
    digits: {
      en: "The field must be numeric and exactly contain {length} digits",
      zhcn: "该字段必须是数字，且精确到{length}位数"
    },
    dimensions: {
      en: "The field must be {width} pixels by {height} pixels",
      zhcn: "该字段必须在{width}像素与{height}像素之间"
    },
    email: { en: "The field must be a valid email", zhcn: "该字段不是一个有效的邮箱" },
    excluded: { en: "The field is not a valid value", zhcn: "该字段不是一个有效值" },
    ext: { en: "The field is not a valid file", zhcn: "该字段不是一个有效的文件" },
    image: { en: "The field must be an image", zhcn: "该字段不是一张有效的图片" },
    integer: { en: "The field must be an integer", zhcn: "该字段必须是整数" },
    length: { en: "The field must be {length} long", zhcn: "该字段长度必须为{length}" },
    max_value: { en: "The field must be {max} or less", zhcn: "该字段必须小于或等于{max}" },
    max: { en: "The field may not be greater than {length} characters", zhcn: "该字段不能超过{length}个字符" },
    mimes: { en: "The field must have a valid file type", zhcn: "该字段不是一个有效的文件类型" },
    min_value: { en: "The field must be {min} or more", zhcn: "该字段必须大于或等于{min}" },
    min: { en: "The field must be at least {length} characters", zhcn: "该字段必须至少有{length}个字符" },
    numeric: { en: "The field may only contain numeric characters", zhcn: "该字段只能包含数字字符" },
    oneOf: { en: "The field is not a valid value", zhcn: "该字段不是一个有效值" },
    regex: { en: "The field format is invalid", zhcn: "该字段格式无效" },
    required_if: { en: "The field is required", zhcn: "该字段是必填项" },
    required: { en: "The field is required", zhcn: "该字段是必填项" },
    size: { en: "The field size must be less than {size}KB", zhcn: "该字段必须小于{size}KB" },
    double: { en: "The field must be a valid decimal", zhcn: "该字段字段必须为有效的小数" }
  }
};
