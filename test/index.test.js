import * as babel from "@babel/core";
import preset from "../dist/index";

describe("babel-preset-miniprogram", () => {
  test("oldest", () => {
    const { code } = babel.transformSync(
      `
      export const a = () => {}
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

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.a = void 0;
var a = exports.a = function a() {};"
`);
  });

  test("latest", () => {
    const { code } = babel.transformSync(
      `
      export const a = { ...b, c }
      export const d = { c, ...d }

      export const e = async (arg) => {
        ''.padEnd(2)
        await console.log(1)
        console.log(2)
        await console.log(3)
      }

      export class F {
        foo () {
          console.log('foo')
        }
      }
    `,
      {
        presets: [
          [
            preset,
            {
              wechatLibVersion: "3.6.0",
              useBuiltIns: "usage",
            },
          ],
        ],
      }
    );
    expect(code).toMatchInlineSnapshot(`
  ""use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.e = exports.d = exports.a = exports.F = void 0;
  const a = exports.a = {
    ...b,
    c
  };
  const d = exports.d = {
    c,
    ...d
  };
  const e = async arg => {
    ''.padEnd(2);
    await console.log(1);
    console.log(2);
    await console.log(3);
  };
  exports.e = e;
  class F {
    foo() {
      console.log('foo');
    }
  }
  exports.F = F;"
  `);
  });
});
