import React, { useState } from "react";
import ReactDOM from "react-dom";
import libCoverage from 'istanbul-lib-coverage';

function Index() {
    const [count, setCount] = useState(0);

    function handleAdd() {
        setCount(count + 1);
    }

    function handleShow() {
        var map = libCoverage.createCoverageMap({})
        map.merge(window.__coverage__);
        Object.keys(map.data).map(key => {
            console.log(key, map.data[key].toSummary().data);
        });
    }


    return (
        <div>
            {count}
            <button onClick={handleAdd}>+1</button>
            <button style={{ position: 'fixed', bottom: 0 }} onClick={handleShow}>Show coverage</button>
        </div>
    )
}

ReactDOM.render(<Index />, document.getElementById("root"));


