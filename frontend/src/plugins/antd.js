import Vue from "vue";

import {
  Alert,
  Anchor,
  AutoComplete,
  Avatar,
  BackTop,
  Badge,
  Breadcrumb,
  Button,
  Calendar,
  Card,
  Carousel,
  Cascader,
  Checkbox,
  Collapse,
  Comment,
  ConfigProvider,
  DatePicker,
  Descriptions,
  Divider,
  Drawer,
  Dropdown,
  Empty,
  Form,
  FormModel,
  Icon,
  List,
  Input,
  InputNumber,
  LocaleProvider,
  Menu,
  message,
  Modal,
  notification,
  PageHeader,
  Pagination,
  Popconfirm,
  Popover,
  Progress,
  Radio,
  Rate,
  Result,
  Select,
  Slider,
  Space,
  Spin,
  Statistic,
  Steps,
  Switch,
  Table,
  Tabs,
  Tag,
  Timeline,
  TimePicker,
  Tooltip,
  Transfer,
  Tree,
  Upload
} from "ant-design-vue";

Vue.use(Alert);
Vue.use(Anchor);
Vue.use(AutoComplete);
Vue.use(Avatar);
Vue.use(BackTop);
Vue.use(Badge);
Vue.use(Breadcrumb);
Vue.use(Button);
Vue.use(Calendar);
Vue.use(Card);
Vue.use(Carousel);
Vue.use(Cascader);
Vue.use(Checkbox);
Vue.use(Collapse);
Vue.use(Comment);
Vue.use(ConfigProvider);
Vue.use(DatePicker);
Vue.use(Descriptions);
Vue.use(Divider);
Vue.use(Drawer);
Vue.use(Dropdown);
Vue.use(Empty);
Vue.use(Form);
Vue.use(FormModel);
Vue.use(Icon);
Vue.use(List);
Vue.use(Input);
Vue.use(InputNumber);
Vue.use(LocaleProvider);
Vue.use(Menu);
Vue.use(message);
Vue.use(Modal);
Vue.use(notification);
Vue.use(PageHeader);
Vue.use(Pagination);
Vue.use(Popconfirm);
Vue.use(Popover);
Vue.use(Progress);
Vue.use(Radio);
Vue.use(Rate);
Vue.use(Result);
Vue.use(Select);
Vue.use(Slider);
Vue.use(Space);
Vue.use(Spin);
Vue.use(Statistic);
Vue.use(Steps);
Vue.use(Switch);
Vue.use(Table);
Vue.use(Tabs);
Vue.use(Tag);
Vue.use(Timeline);
Vue.use(TimePicker);
Vue.use(Tooltip);
Vue.use(Transfer);
Vue.use(Tree);
Vue.use(Upload);

Vue.prototype.$confirm = Modal.confirm;
Vue.prototype.$message = message;
Vue.prototype.$notification = notification;
Vue.prototype.$info = Modal.info;
Vue.prototype.$success = Modal.success;
Vue.prototype.$error = Modal.error;
Vue.prototype.$warning = Modal.warning;
