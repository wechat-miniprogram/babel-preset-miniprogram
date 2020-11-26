module.exports = {
  presets: [
    [
      require.resolve("../index"),
      {
        wechatLibVersion: "2.15.0",
        useBuiltIns: "usage",
      },
    ],
  ],
};
