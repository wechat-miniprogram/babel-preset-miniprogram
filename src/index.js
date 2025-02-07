import * as mpCompatData from "miniprogram-compat";
import corejsCompatData from "core-js-compat";
import babelPresetEnv from "@babel/preset-env";
import semver from "semver";
import { declare } from "@babel/helper-plugin-utils";

const babelPresetMiniprogram = declare((api, opts, dirname) => {
  api.assertVersion(7);

  let { wechatLibVersion, ...restOpts } = opts;
  wechatLibVersion = wechatLibVersion || "1.0.0";

  const browserslist = mpCompatData.getBrowsersList(wechatLibVersion);
  const polyfillInfo = mpCompatData.getPolyfillInfo(wechatLibVersion);

  if (!browserslist || !polyfillInfo) {
    throw new Error(
      `Wechat mini program version ${wechatLibVersion} is invalid.`
    );
  }

  if (semver.major(restOpts.corejs) < 3) {
    throw new Error(
      `babel-preset-miniprogram only support core-js@3.`
    );
  }

  const polyfillsToIgnore = [];

  if (semver.major(polyfillInfo.coreJsVersion) < 3) {
    // core js 2
    polyfillsToIgnore.push(
      ...require("../data/core-js-2-modules.json").modules
    );
  } else {
    // core js 3
    polyfillsToIgnore.push(
      ...corejsCompatData
        .getModulesListForTargetVersion(polyfillInfo.coreJsVersion)
        .filter((module) => polyfillInfo.coreJsModules.indexOf(module) !== -1)
    );
  }

  const result = babelPresetEnv(
    api,
    {
      corejs: 3,
      ...restOpts,
      ignoreBrowserslistConfig: true,
      exclude: (restOpts.exclude || []).concat(polyfillsToIgnore),
      targets: browserslist,
    },
    dirname
  );

  return result;
});

export default babelPresetMiniprogram;
