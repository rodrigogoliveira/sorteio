import React from "react";
import ReactDOM from "react-dom";

import Sortition from "./components/Sortition";

const App = props => (
  <div>
    <Sortition />
  </div>
);

export default App;
ReactDOM.render(
  <App />,
  document.getElementById("app")
);
