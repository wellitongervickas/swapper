export type StateProperties<S> = {
  [P in keyof S]: {
    enumerable: boolean
    set: ((value: S[P]) => void) | undefined
    get: (() => S[P]) | undefined
  }
}
