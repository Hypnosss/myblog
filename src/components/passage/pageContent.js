import React, { Component } from 'react';

import RightInfos from '../main/content/rightInfos';
import PageMain from './pageMain';

class pageContent extends Component {
  constructor(props) {
    super(props);
    this.changepageContentBGPosition = this.changepageContentBGPosition.bind(this);
  }

  changepageContentBGPosition() {
    let pageContentBG = document.getElementsByClassName("pageContentBG")[0];
    let y = 0.3 * window.innerHeight;
    if(window.scrollY > y) {
      pageContentBG.classList.add("fixed");
    } else {
      pageContentBG.classList.remove("fixed");
    }
  }

  componentDidMount() {
    document.addEventListener("scroll", this.changepageContentBGPosition);
  }

  componentWillUnmount() {
    document.removeEventListener("scroll", this.changepageContentBGPosition);
  }

  render() { 
    return (  
      <div className="pageContent">
        <div className="pageContentBG"></div>
        <PageMain id={this.props.id}/>
        <RightInfos myType="page"/>
      </div>
    );
  }
}
 
export default pageContent;