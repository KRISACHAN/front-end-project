export default function RefIndex() {
    return (
        <div>
            <h1>React 19 ref Demos</h1>
            <p>这里展示了 React 19 中关于 ref 作为 prop 的新特性演示：</p>
            <ul>
                <li>ref prop - 直接在函数组件中使用 ref prop，不再需要 forwardRef</li>
                <li>ref cleanup - ref 回调函数支持返回清理函数</li>
            </ul>
        </div>
    );
}
