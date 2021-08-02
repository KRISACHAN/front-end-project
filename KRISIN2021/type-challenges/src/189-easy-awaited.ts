import { Equal, Expect } from '@type-challenges/utils'

// https://github.com/Microsoft/TypeScript/pull/21496
type Awaited<T extends Promise<any>> = T extends Promise<infer U> ? U : never

type X = Promise<string>
type Y = Promise<{ field: number }>

type cases = [
  Expect<Equal<Awaited<X>, string>>,
  Expect<Equal<Awaited<Y>, { field: number }>>,
]

// @ts-expect-error
type error = Awaited<number>