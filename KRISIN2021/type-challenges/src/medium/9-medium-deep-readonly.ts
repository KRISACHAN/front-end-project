import { Equal, Expect } from '@type-challenges/utils'

// copied from https://stackoverflow.com/questions/68693054/what-is-extends-never-used-for/68693367

type DeepReadonly<T> = keyof T extends never
    ? T
    : { readonly [k in keyof T]: DeepReadonly<T[k]> };


type X = {
    a: () => 22
    b: string
    c: {
        d: boolean
        e: {
            g: {
                h: {
                    i: true
                    j: 'string'
                    }
                    k: 'hello'
            }
        }
    }
}

type Expected = {
    readonly a: () => 22
    readonly b: string
    readonly c: {
        readonly d: boolean
        readonly e: {
            readonly g: {
                readonly h: {
                readonly i: true
                readonly j: 'string'
                }
                readonly k: 'hello'
            }
        }
    }
}

type cases = [
    Expect<Equal<DeepReadonly<X>, Expected>>,
]
