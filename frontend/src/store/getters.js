const getters = {
  isMobile: state => state.app.isMobile,
  lang: state => state.app.lang,
  theme: state => state.app.theme,
  color: state => state.app.color,
  multiTab: state => state.app.multiTab,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  fullname: state => state.user.fullname
};

export default getters;
