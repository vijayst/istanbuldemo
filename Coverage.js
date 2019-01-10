import React, { Component } from 'react';
import libCoverage from 'istanbul-lib-coverage';

export default class Coverage extends Component {
    constructor() {
        super();
        this.state = { fileCoverages: [] };
    }

    handleClose() {
        this.setState({ fileCoverages: [] });
    }

    handleShow() {
        var map = libCoverage.createCoverageMap({});
        map.merge(window.__coverage__);
        let minSlashes = 100;
        const fileCoverages = Object.keys(map.data).map(key => {
            const slashes = key.split('/').length;
            console.log(slashes, minSlashes);
            if (slashes < minSlashes) {
                minSlashes = slashes;
            }
            return {
                key,
                data: map.data[key].toSummary().data
            };
        });
        fileCoverages.forEach(fileCoverage => {
            fileCoverage.key = fileCoverage.key
                .split('/')
                .slice(minSlashes - 1)
                .join();
        });
        this.setState({ fileCoverages });
    }

    render() {
        const { fileCoverages } = this.state;
        return (
            <div>
                {fileCoverages.length ? (
                    <div
                        style={{
                            padding: 20,
                            backgroundColor: 'rgba(0,0,0,.12)',
                            position: 'fixed',
                            bottom: 30
                        }}
                    >
                        <table border="1" cellSpacing="0">
                            <thead>
                                <tr>
                                    <th width="200">File</th>
                                    <th width="50">Branches</th>
                                    <th width="50">Functions</th>
                                    <th width="50">Lines</th>
                                    <th width="50">Statements</th>
                                </tr>
                            </thead>
                            <tbody>
                                {fileCoverages.map(fileCoverage => (
                                    <tr key={fileCoverage.key}>
                                        <td>{fileCoverage.key}</td>
                                        <td>
                                            {fileCoverage.data.branches.pct}
                                        </td>
                                        <td>
                                            {fileCoverage.data.functions.pct}
                                        </td>
                                        <td>{fileCoverage.data.lines.pct}</td>
                                        <td>
                                            {fileCoverage.data.statements.pct}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div style={{ textAlign: 'right', marginTop: 12 }}>
                            <button
                                style={{
                                    backgroundColor: 'rgba(0,0,0,.24)',
                                    color: 'white',
                                    padding: '5px 10px',
                                    fontSize: 16,
                                    border: 0
                                }}
                                onClick={this.handleClose.bind(this)}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                ) : null}
                <button
                    style={{
                        position: 'fixed',
                        bottom: 0,
                        backgroundColor: 'red',
                        color: 'white',
                        padding: '5px 10px',
                        fontSize: 16,
                        border: 0
                    }}
                    onClick={this.handleShow.bind(this)}
                >
                    Show coverage
                </button>
            </div>
        );
    }
}
