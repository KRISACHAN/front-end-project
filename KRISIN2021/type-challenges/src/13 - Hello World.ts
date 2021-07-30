import { Equal, Expect, NotAny } from '@type-challenges/utils'

type HelloWorld = string

export type cases = [
    Expect<NotAny<HelloWorld>>,
    Expect<Equal<HelloWorld, string>>
]