import { Equal, Expect } from '@type-challenges/utils'

type MyPick<T, K extends keyof T> = {
    [P in K]: T[P]
}

interface Todo {
    title: string
    description: string
    completed: boolean
}
  
interface Expected1 {
    title: string
}
  
interface Expected2 {
    title: string
    completed: boolean
}

type cases = [
  Expect<Equal<Expected1, MyPick<Todo, 'title'>>>,
  Expect<Equal<Expected2, MyPick<Todo, 'title' | 'completed'>>>,
  MyPick<Todo, 'title' | 'completed' | 'invalid'>,
]
