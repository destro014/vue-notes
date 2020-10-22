module.exports = {
  lintOnSave: false,
  pwa: {
    workboxPluginMode: "InjectManifest",
    workboxOptions: {
      swSrc: "./src/sw.js",
      swDest: "service-worker.js"
    },
    name: "Destro Notes",
    themeColor: "#0a96f8",
    backgroundColor: "#ffffff",
    msTileColor: "#ffffff",
    appleMobileWebAppCapable: "yes",
    appleMobileWebAppStatusBarStyle: "#0a96f8",
    manifestOptions: {
      background_color: "#ffffff"
    }
  },
  chainWebpack: config => {
    config.plugin("html").tap(args => {
      args[0].title = "Destro Notes";
      return args;
    });
  }
};
