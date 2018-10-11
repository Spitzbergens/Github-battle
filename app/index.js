var React = require("react");
var ReactDOM = require("react-dom");
require('./index.css');

// COMPONENT:

// state
// lifecycle-events
// hook into different lifecycle moments
// UI

class App extends React.Component {
    render() {
        return <div> Hello World! </div>;
    }
}

ReactDOM.render(<App />, document.getElementById("app"));