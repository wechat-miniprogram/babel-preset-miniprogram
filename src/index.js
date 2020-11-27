import mpCompatData from "miniprogram-compat";
import corejsCompatData from "core-js-compat";
import babelPresetEnv from "@babel/preset-env";
import semver from "semver";
import { declare } from "@babel/helper-plugin-utils";

const babelPresetMiniprogram = declare((api, opts, dirname) => {
  api.assertVersion(7);

  const { wechatLibVersion, ...restOpts } = opts;
  wechatLibVersion = wechatLibVersion || "1.0.0";

  const browserslist = mpCompatData.getBrowsersList(wechatLibVersion);
  const {
    coreJsVersion: polyfillCoreJsVersion,
    exclude: polyfillExcludeModules,
  } = mpCompatData.getPolyfillInfo(wechatLibVersion);

  const polyfillsToIgnore = [];

  if (semver.major(polyfillCoreJsVersion) < 3) {
    // core js 2
    polyfillsToIgnore.push(
      ...require("../data/core-js-2-modules.json").modules
    );
  } else {
    // core js 3
    const polyfillExcludeRegexps = (polyfillExcludeModules || []).map(
      (module) => new RegExp(`^${module}$`)
    );
    polyfillsToIgnore.push(
      ...corejsCompatData
        .getModulesListForTargetVersion(polyfillCoreJsVersion)
        .filter(
          (module) =>
            !polyfillExcludeRegexps.some((exclude) => exclude.test(module))
        )
    );
  }

  const result = babelPresetEnv(
    api,
    {
      ...restOpts,
      ignoreBrowserslistConfig: true,
      exclude: (restOpts.exclude || []).concat(polyfillsToIgnore),
      targets: browserslist,
      corejs: 3,
    },
    dirname
  );

  return result;
});

export default babelPresetMiniprogram;
