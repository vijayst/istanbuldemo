import React, { useState } from "react";
import ReactDOM from "react-dom";
import { CoverageSummary } from 'istanbul-coverage-display';
import 'istanbul-coverage-display/dist/bundle.css'

function Index() {
    const [count, setCount] = useState(0);

    function handleAdd() {
        setCount(count + 1);
    }

    return (
        <div>
            {count}
            <button onClick={handleAdd}>+1</button>
            <CoverageSummary />
        </div>
    )
}

ReactDOM.render(<Index />, document.getElementById("root"));


