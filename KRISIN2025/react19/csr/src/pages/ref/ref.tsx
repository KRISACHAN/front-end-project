import { useRef } from 'react';

function MyInput({ placeholder, ref }: { placeholder?: string; ref?: React.Ref<HTMLInputElement> }) {
    return <input placeholder={placeholder} ref={ref} />;
}

export default function RefDemo() {
    const inputRef = useRef<HTMLInputElement>(null);

    const focusInput = () => {
        inputRef.current?.focus();
    };

    return (
        <div className="space-y-8">
            <section>
                <h2 className="text-xl font-bold mb-4">ref 作为 prop</h2>
                <div className="space-y-4">
                    <MyInput ref={inputRef} placeholder="直接使用 ref prop" />
                    <button
                        onClick={focusInput}
                        className="px-4 py-2 bg-blue-500 text-white rounded"
                    >
                        Focus Input
                    </button>
                </div>
            </section>
        </div>
    );
}
