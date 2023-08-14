# babel-preset-miniprogram

微信小程序 babel 构建环境预设

[官方repo地址](https://github.com/wechat-miniprogram/babel-preset-miniprogram)，该repo是官方包的修复版本。

## 安装

```bash
npm install --save-dev babel-preset-mp
```

## 使用

```javascript
// babel.config.js
module.exports = {
  presets: [
    [
      'babel-preset-miniprogram',
      {
        wechatLibVersion: '2.14.0', // 指定小程序最低基础库版本
        useBuiltIns: 'usage', // 打入 Polyfill
        modules: 'cjs', // 将代码转义为 commonjs
      },
    ],
  ],
};
```

## 配置项

### `wechatLibVersion: string`
指定构建小程序的目标最低[基础库版本](https://developers.weixin.qq.com/miniprogram/dev/framework/client-lib/version.html)，可以在 [小程序管理页](https://mp.weixin.qq.com/) 【设置】-【基本设置】-【基础库最低版本设置】中设置你的小程序最低版本

其余配置项可直接使用 [`@babel/preset-env`配置项](https://babeljs.io/docs/en/babel-preset-env#options)

## 实现

由于小程序基础库版本会与小程序[运行环境](https://developers.weixin.qq.com/miniprogram/dev/framework/runtime/env.html)版本绑定，因此特定小程序基础库可能的运行环境是确定的。
该预设便是利用该信息，只将运行环境必要的转义和 Polyfill 设置给 `@babel/preset-env`，从而尽可能减少编译处理和小程序代码体积。

另外由于小程序基础库本身自带了一个 [Polyfill](https://developers.weixin.qq.com/miniprogram/dev/framework/runtime/js-support.html)，该预设也会避免打入不必要的 Polyfill。
