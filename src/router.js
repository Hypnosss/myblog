import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import Light from "./components/light/light";
import Main from "./components/main/main"
import Passage from "./components/passage/passage";
import BackstageLogin from "./components/backstageLogin";
import Backstage from "./components/backstage";

class AppRouter extends Component {
  render() { 
    return (
      <Router>
        <Route path="/" exact component={Light}/>
        <Route path="/start" component={Main}/>
        <Route path="/passage/:id" component={Passage}/>
        <Route path="/backstageLogin" component={BackstageLogin}/>
        <Route path="/backstagedasnofhoasdnhaos" component={Backstage}/>
      </Router>
    );
  }
}
 
export default AppRouter;