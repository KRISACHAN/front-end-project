import { Alike, Expect } from '@type-challenges/utils'

type MyReadonly2<T, K extends keyof T = keyof T> = { readonly [P in K]: T[P] } & T

interface Todo1 {
    title: string
    description?: string
    completed: boolean
}

interface Todo2 {
    readonly title: string
    description?: string
    completed: boolean
}

interface Expected {
    readonly title: string
    readonly description?: string
    completed: boolean
}

interface Todo {
    title: string
    description: string
    completed: boolean
}
const todo: MyReadonly2<Todo, 'title' | 'description'> = {
    title: "Hey",
    description: "foobar",
    completed: false,
}
todo.title = "Hello" // Error: cannot reassign a readonly property
todo.description = "barFoo" // Error: cannot reassign a readonly property
todo.completed = true // OK

type cases = [
    Expect<Alike<MyReadonly2<Todo1>, Readonly<Todo1>>>,
    Expect<Alike<MyReadonly2<Todo1, 'title' | 'description'>, Expected>>,
    Expect<Alike<MyReadonly2<Todo2, 'title' | 'description'>, Expected>>,
]