import { Equal, Expect } from '@type-challenges/utils'

type MyOmit<T, K extends string | number | symbol> = { [P in Exclude<keyof T, K>]: T[P]; }

interface Todo {
    title: string
    description: string
    completed: boolean
}

interface Expected1 {
    title: string
    completed: boolean
}

interface Expected2 {
    title: string
}

type cases = [
    Expect<Equal<Expected1, MyOmit<Todo, 'description'>>>,
    Expect<Equal<Expected2, MyOmit<Todo, 'description' | 'completed'>>>
]