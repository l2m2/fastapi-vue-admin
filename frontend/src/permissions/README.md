## 权限配置
- 层级：固定为3级

  第一级为大分类，例如系统设置、功能配置等
  
  第二级为模块名称，例如用户管理、角色管理等

  第三级为具体的 Action，例如新增、修改、删除、读取等

- 编写配置

  固定在permissions目录下编写

  ```
  |--permissions/
  |  |--admin/
  |  |  |--user.json
  |  |  |--role.json
  ```

  权限的第一级是permissions下的子目录(例如admin)

  权限的第二级是配置文件的文件名

  权限的第三级在JSON中书写，例如`["read", "create", "edit", "delete"]`,由于通常增删查改是模块的基础权限，支持`"CRUD"`表示增删查改来简化配置, 也支持用CRUD的子集来表示部分权限，比如`"R"`表示仅有读取的权限。

- 权限配置的翻译

  在`locales/permissions.i18n.js`中进行翻译配置。

  CRUD四种基础权限不用翻译。

  