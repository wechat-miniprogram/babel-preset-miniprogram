import * as babel from "@babel/core";
import preset from "../dist/index";

describe("babel-preset-miniprogram", () => {
  test("oldest", () => {
    const { code } = babel.transformSync(
      `
      console.log(globalThis, () => {})
    `,
      {
        presets: [
          [
            preset,
            {
              wechatLibVersion: "1.0.0",
              useBuiltIns: "usage",
            },
          ],
        ],
      }
    );
    expect(code).toMatchInlineSnapshot(`
""use strict";

require("core-js/modules/esnext.global-this.js");
console.log(globalThis, function () {});"
`);
  });

  test("latest", () => {
    expect(
  babel.transformSync(
    `
      console.log(globalThis, () => {}, new Promise())
    `,
    {
      presets: [
      [
      preset,
      {
        wechatLibVersion: "2.16.1",
        useBuiltIns: "usage"
      }]]


    }
  ).code
).toMatchInlineSnapshot(`
""use strict";

require("core-js/modules/es.promise.js");
require("core-js/modules/esnext.global-this.js");
console.log(globalThis, () => {}, new Promise());"
`);
    expect(
  babel.transformSync(
    `
      console.log(globalThis, () => {}, new Promise())
    `,
    {
      presets: [
      [
      preset,
      {
        wechatLibVersion: "3.6.0",
        useBuiltIns: "usage"
      }]]


    }
  ).code
).toMatchInlineSnapshot(`
""use strict";

console.log(globalThis, () => {}, new Promise());"
`);
  });
});
