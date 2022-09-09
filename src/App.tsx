import "./App.css";

import { HashRouter, Route, Switch } from "react-router-dom";

import Navbar from "./components/Navbar";
import Capsules from "./pages/Capsules";
import Contracts from "./pages/Contracts";
import Edit from "./pages/Edit";
import Landing from "./pages/Landing";
import Minter from "./pages/Minter";
import Pause from "./pages/Pause";
import Withdraw from "./pages/Withdraw";
import Typeface from "./pages/Typeface";

export default function App() {
  // console.log(unicodes.map((code) => charToUtf8Bytes4(String.fromCharCode(code))));

  return (
    <div>
      <Navbar />
      <HashRouter>
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route path="/mint" component={Minter} />
          <Route path="/minted/:wallet" component={Capsules} />
          <Route path="/minted" component={Capsules} />
          <Route path="/contracts" component={Contracts} />
          <Route path="/pause" component={Pause} />
          <Route path="/withdraw" component={Withdraw} />
          <Route path="/typeface" component={Typeface} />
          <Route path="/c/:id" component={Edit} />
        </Switch>
      </HashRouter>
    </div>
  );
}
