const path = require("path");
const webpack = require("webpack");
const GitRevisionPlugin = require("git-revision-webpack-plugin");
const GitRevision = new GitRevisionPlugin();
const buildDate = JSON.stringify(new Date().toLocaleString());
const createThemeColorReplacerPlugin = require("./config/plugin.config");

function resolve(dir) {
  return path.join(__dirname, dir);
}

// check Git
function getGitHash() {
  try {
    return GitRevision.version();
  } catch (e) {
    console.log(e);
  }
  return "unknown";
}

// vue.config.js
const vueConfig = {
  configureWebpack: {
    // webpack plugins
    plugins: [
      // Ignore all locale files of moment.js
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
      new webpack.DefinePlugin({
        APP_VERSION: `"${require("./package.json").version}"`,
        GIT_HASH: JSON.stringify(getGitHash()),
        BUILD_DATE: buildDate
      })
    ]
  },

  chainWebpack: config => {
    config.resolve.alias.set("@$", resolve("src"));

    const svgRule = config.module.rule("svg");
    svgRule.uses.clear();
    svgRule
      .oneOf("inline")
      .resourceQuery(/inline/)
      .use("vue-svg-icon-loader")
      .loader("vue-svg-icon-loader")
      .end()
      .end()
      .oneOf("external")
      .use("file-loader")
      .loader("file-loader")
      .options({
        name: "assets/[name].[hash:8].[ext]"
      });
  },

  css: {
    loaderOptions: {
      less: {
        // DO NOT REMOVE THIS LINE
        javascriptEnabled: true
      }
    }
  },

  devServer: {
    proxy: "http://127.0.0.1:8000/"
  },

  // disable source map in production
  productionSourceMap: false,

  lintOnSave: undefined,

  // babel-loader no-ignore node_modules/*
  transpileDependencies: [],

  pluginOptions: {
    i18n: {
      locale: "en",
      fallbackLocale: "en",
      localeDir: "locales",
      enableInSFC: false
    }
  }
};

// preview.pro.loacg.com only do not use in your production;
if (process.env.NODE_ENV !== "production") {
  // add `ThemeColorReplacer` plugin to webpack plugins
  vueConfig.configureWebpack.plugins.push(createThemeColorReplacerPlugin());
}

module.exports = vueConfig;
