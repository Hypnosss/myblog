import React, { Component } from 'react';

import LeftContent from "./leftContent";
import RightInfos from "./rightInfos";


class content extends Component {
  constructor(props) {
    super(props);
    this.changeContentBGPosition = this.changeContentBGPosition.bind(this);
  }

  changeContentBGPosition() {
    let contentBG = document.getElementsByClassName("contentBG")[0];
    let y;
    if(this.props.myType === "page") {
      y = 0.3 * window.innerHeight;
    } else {
      y = window.innerHeight;
    }
    if(window.scrollY >= y) {
      contentBG.classList.add("fixed");
    } else {
      contentBG.classList.remove("fixed");
    }
  }

  componentDidMount() {
    document.addEventListener("scroll", this.changeContentBGPosition);
  }

  componentWillUnmount() {
    document.removeEventListener("scroll", this.changeContentBGPosition);
  }

  render() { 
    return (  
      <div className="content">
        <div className="contentBG"></div>
        <LeftContent/>
        <RightInfos/>
      </div>
    );
  }
}
 
export default content;