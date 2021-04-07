const getters = {
  isMobile: state => state.app.isMobile,
  lang: state => state.app.lang,
  theme: state => state.app.theme,
  color: state => state.app.color,
  multiTab: state => state.app.multiTab,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  username: state => state.user.username,
  fullname: state => state.user.fullname,
  userInfo: state => state.user.info,
  permissions: state => state.user.permissions,
  additionalRouters: state => state.permission.additionalRouters
};

export default getters;
