import { useState } from 'react';

export default function Counter() {
    const [count, setCount] = useState(0);

    return (
        <div class="flex flex-col items-center gap-4 p-4 rounded-xl bg-base-100 shadow-xl border border-primary/20">
            <h2 class="text-xl font-bold">React Interactive Component</h2>
            <div class="text-4xl font-mono text-primary">{count}</div>
            <div class="flex gap-2">
                <button
                    class="btn btn-circle btn-outline btn-sm"
                    onClick={() => setCount(count - 1)}
                >
                    -
                </button>
                <button
                    class="btn btn-circle btn-primary btn-sm"
                    onClick={() => setCount(count + 1)}
                >
                    +
                </button>
            </div>
        </div>
    );
}
