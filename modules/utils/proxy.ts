/* global Proxy */
type Obj<T> = {
  [key in keyof T]: {
    value: any
    set: Function
  }
}

function readOnly<T, Z extends Obj<T>>(obj: Z) {
  const getter = {
    get(target: Z, prop: keyof Z) {
      return target[prop]?.value
    },
    set() {
      throw new Error('ready only proxy')
    }
  }

  const proxy = new Proxy(obj, getter as any) as unknown as {
    [key in keyof T]: T[key]
  }

  return proxy
}

const porxyUtils = {
  readOnly
}

export default porxyUtils
