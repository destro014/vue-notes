module.exports = {
  lintOnSave: false,
  pwa: {
    name: "Destro Nores",
    themeColor: "#0a96f8",
    msTileColor: "#000000",
    appleMobileWebAppCapable: "yes",
    appleMobileWebAppStatusBarStyle: "#0a96f8"
  },
  chainWebpack: config => {
    config.plugin("html").tap(args => {
      args[0].title = "Destro Notes";
      return args;
    });
  }
};
