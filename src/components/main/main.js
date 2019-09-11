import React, { Component } from 'react';

import HeaderNav from "./headerNav/headerNav";
import MainCover from "./mainCover/mainCover";
import Content from "./content/content";
import Scroll from "../scroll/scroll";

class Main extends Component {
  render() { 
    return (
      <React.Fragment>
        <HeaderNav/>
        <MainCover/>
        <Content/>
        <Scroll myType="main"/>
      </React.Fragment>
    );
  }
}
 
export default Main;