import React, { useState } from "react";
import ReactDOM from "react-dom";
import Coverage from './Coverage';

function Index() {
    const [count, setCount] = useState(0);

    function handleAdd() {
        setCount(count + 1);
    }

    return (
        <div>
            {count}
            <button onClick={handleAdd}>+1</button>
            <Coverage />
        </div>
    )
}

ReactDOM.render(<Index />, document.getElementById("root"));


