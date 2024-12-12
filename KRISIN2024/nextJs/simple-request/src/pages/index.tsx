import type { NextPage, GetStaticProps } from "next";
import Link from "next/link";

interface Todo {
    id: number;
    title: string;
    completed: boolean;
}

interface Props {
    todos: Todo[];
}

export const getStaticProps: GetStaticProps = async () => {
    const res = await fetch("https://jsonplaceholder.typicode.com/todos");
    const todos: Todo[] = await res.json();
    return {
        props: {
            todos,
        },
    };
};

const Home: NextPage<Props> = ({ todos }) => {
    return (
        <div>
            <h1>Todo List</h1>
            <ul>
                {todos.map(todo => (
                    <li key={todo.id}>
                        <Link href={`/items/${todo.id}`} passHref>
                            <span style={{ color: "blue", cursor: "pointer" }}>
                                {todo.title} -{" "}
                                {todo.completed ? "已完成" : "未完成"}
                            </span>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Home;
