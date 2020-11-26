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
