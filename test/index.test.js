import * as babel from "@babel/core";
import preset from "../src/index";
import corejsPkg from "core-js/package.json";

const corejs = corejsPkg.version;

describe("babel-preset-miniprogram", () => {
  describe("oldest", () => {
    test("promise.finally", () => {
      expect(
        babel.transformSync(
          `
            var p = Promise.resolve(0);
            p.finally(() => {
              alert("OK");
            });
          `,
          {
            presets: [
              [
                preset,
                {
                  wechatLibVersion: "1.0.0",
                  useBuiltIns: "usage",
                  corejs,
                },
              ],
            ],
          }
        ).code
      ).toMatchInlineSnapshot(`
        ""use strict";

        require("core-js/modules/es.promise.finally.js");
        var p = Promise.resolve(0);
        p.finally(function () {
          alert("OK");
        });"
      `);
    });
    test("globalThis", () => {
      expect(
        babel.transformSync(
          `
            if (globalThis) alert("OK");
          `,
          {
            presets: [
              [
                preset,
                {
                  wechatLibVersion: "1.0.0",
                  useBuiltIns: "usage",
                  corejs,
                },
              ],
            ],
          }
        ).code
      ).toMatchInlineSnapshot(`
        ""use strict";

        require("core-js/modules/es.global-this.js");
        if (globalThis) alert("OK");"
      `);
    });
    test("entry", () => {
      expect(
        babel.transformSync(
          `
            import 'core-js/es/aggregate-error';
            import 'core-js/es/object/assign';
            import 'core-js/es/object/create';
            import 'core-js/es/object/define-properties';
            import 'core-js/es/object/define-property';
            import 'core-js/es/object/entries';
            import 'core-js/es/object/from-entries';
            import 'core-js/es/object/get-own-property-descriptors';
            import 'core-js/es/object/has-own';
            import 'core-js/es/global-this';
            import 'core-js/es/promise';
            import 'core-js/es/promise/all-settled';
            import 'core-js/es/promise/any';
            import 'core-js/es/promise/finally';
            import 'core-js/es/promise/try';
            import 'core-js/es/promise/with-resolvers';
          `,
          {
            presets: [
              [
                preset,
                {
                  wechatLibVersion: "1.0.0",
                  useBuiltIns: "entry",
                  corejs,
                },
              ],
            ],
          }
        ).code
      ).toMatchInlineSnapshot(`
        ""use strict";

        require("core-js/modules/es.aggregate-error.js");
        require("core-js/modules/es.global-this.js");
        require("core-js/modules/es.object.entries.js");
        require("core-js/modules/es.object.from-entries.js");
        require("core-js/modules/es.object.get-own-property-descriptors.js");
        require("core-js/modules/es.object.has-own.js");
        require("core-js/modules/es.promise.all-settled.js");
        require("core-js/modules/es.promise.any.js");
        require("core-js/modules/es.promise.finally.js");
        require("core-js/modules/es.promise.try.js");
        require("core-js/modules/es.promise.with-resolvers.js");"
      `);
    });
  });

  describe("corejs 3", () => {
    test("promise.finally", () => {
      expect(
        babel.transformSync(
          `
            var p = Promise.resolve(0);
            p.finally(() => {
              alert("OK");
            });
          `,
          {
            presets: [
              [
                preset,
                {
                  wechatLibVersion: "2.16.1",
                  useBuiltIns: "usage",
                  corejs,
                },
              ],
            ],
          }
        ).code
      ).toMatchInlineSnapshot(`
        ""use strict";

        var p = Promise.resolve(0);
        p.finally(() => {
          alert("OK");
        });"
      `);
    });
    test("globalThis", () => {
      expect(
        babel.transformSync(
          `
            if (globalThis) alert("OK");
          `,
          {
            presets: [
              [
                preset,
                {
                  wechatLibVersion: "2.16.1",
                  useBuiltIns: "usage",
                  corejs,
                },
              ],
            ],
          }
        ).code
      ).toMatchInlineSnapshot(`
        ""use strict";

        require("core-js/modules/es.global-this.js");
        if (globalThis) alert("OK");"
      `);
    });
    test("entry", () => {
      expect(
        babel.transformSync(
          `
            import 'core-js/es/aggregate-error';
            import 'core-js/es/object/entries';
            import 'core-js/es/object/from-entries';
            import 'core-js/es/object/get-own-property-descriptors';
            import 'core-js/es/object/has-own';
            import 'core-js/es/global-this';
            import 'core-js/es/promise';
            import 'core-js/es/promise/all-settled';
            import 'core-js/es/promise/any';
            import 'core-js/es/promise/finally';
            import 'core-js/es/promise/try';
            import 'core-js/es/promise/with-resolvers';
          `,
          {
            presets: [
              [
                preset,
                {
                  wechatLibVersion: "2.16.1",
                  useBuiltIns: "entry",
                  corejs,
                },
              ],
            ],
          }
        ).code
      ).toMatchInlineSnapshot(`
        ""use strict";

        require("core-js/modules/es.aggregate-error.js");
        require("core-js/modules/es.global-this.js");
        require("core-js/modules/es.object.has-own.js");
        require("core-js/modules/es.promise.all-settled.js");
        require("core-js/modules/es.promise.any.js");
        require("core-js/modules/es.promise.try.js");
        require("core-js/modules/es.promise.with-resolvers.js");"
      `);
      expect(
        babel.transformSync(
          `
            import 'core-js/es/aggregate-error';
            import 'core-js/es/object/entries';
            import 'core-js/es/object/from-entries';
            import 'core-js/es/object/get-own-property-descriptors';
            import 'core-js/es/object/has-own';
            import 'core-js/es/global-this';
            import 'core-js/es/promise';
            import 'core-js/es/promise/all-settled';
            import 'core-js/es/promise/any';
            import 'core-js/es/promise/finally';
            import 'core-js/es/promise/try';
            import 'core-js/es/promise/with-resolvers';
          `,
          {
            presets: [
              [
                preset,
                {
                  wechatLibVersion: "3.6.1",
                  useBuiltIns: "entry",
                  corejs,
                },
              ],
            ],
          }
        ).code
      ).toMatchInlineSnapshot(`
        ""use strict";

        require("core-js/modules/es.promise.try.js");
        require("core-js/modules/es.promise.with-resolvers.js");"
      `);
    });
  });
});
