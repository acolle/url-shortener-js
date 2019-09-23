import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Header from "./Header";
import Landing from "./Landing";
import "../styles/styles.css";

class App extends Component {
  componentDidMount() {}

  render() {
    return (
      <div className="container">
        <BrowserRouter>
          <div>
            <Header />
            <Switch>
              <Route path="/" component={Landing} />
            </Switch>
          </div>
        </BrowserRouter>
        <div className="footer">
          Source code can be found on
          <a target="_blank" rel="noopener noreferrer" href="https://github.com/acolle/url-shortener">
            Github
          </a>© 2019
        </div>
      </div>
    );
  }
}

export default App;
