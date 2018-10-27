import { IMaybe, IMaybePattern } from "../interfaces"

export function maybe<T>(value?: T): IMaybe<NonNullable<T>> {
  return {
    of: maybe,
    valueOr: (val: NonNullable<T>) => value === null || value === undefined ? val : value as NonNullable<T>,
    valueOrCompute: (f: () => NonNullable<T>) => value === null || value === undefined ? f() : value as NonNullable<T>,
    tap: (obj: Partial<IMaybePattern<T, void>>) => value === null || value === undefined ? obj.none && obj.none() : obj.some && obj.some(value as NonNullable<T>),
    tapNone: (f: () => void) => (value === null || value === undefined) && f(),
    tapSome: (f: (val: NonNullable<T>) => void) => value !== null && value !== undefined && f(value as NonNullable<T>),
    match: <R>(pattern: IMaybePattern<T, R>) => value === null || value === undefined ? pattern.none() : pattern.some(value as NonNullable<T>),
    map: <R>(f: (t: NonNullable<T>) => R) => value === null || value === undefined ? maybe<R>() : maybe<R>(f(value as NonNullable<T>)),
    flatMap: <R>(f: (d: NonNullable<T>) => IMaybe<R>) => value === null || value === undefined ? maybe<R>() : f(value as NonNullable<T>),
    filter: (fn: (d: NonNullable<T>) => boolean) => value === null || value === undefined
      ? maybe()
      : fn(value as NonNullable<T>)
        ? maybe(value as NonNullable<T>)
        : maybe()
  }
}
