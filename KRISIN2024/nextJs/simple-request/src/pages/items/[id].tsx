import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Link from "next/link";

interface Todo {
    id: number;
    title: string;
    completed: boolean;
}

interface Props {
    todo: Todo;
}

export const getStaticPaths: GetStaticPaths = async () => {
    const res = await fetch("https://jsonplaceholder.typicode.com/todos");
    const todos: Todo[] = await res.json();
    const paths = todos.map(todo => ({
        params: { id: todo.id.toString() },
    }));

    return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async context => {
    const { id } = context.params!;
    const res = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`);
    const todo: Todo = await res.json();

    return {
        props: {
            todo,
        },
    };
};

const Item: NextPage<Props> = ({ todo }) => {
    return (
        <div>
            <h1>{todo.title}</h1>
            <p>{todo.completed ? "已完成" : "未完成"}</p>
            <Link href="/" passHref>
                <span style={{ color: "blue", cursor: "pointer" }}>
                    返回列表
                </span>
            </Link>
        </div>
    );
};

export default Item;
