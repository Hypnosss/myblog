import React, { Component } from 'react';
import './passage.css'

import HeaderNav from '../main/headerNav/headerNav';
import Scroll from '../scroll/scroll';
import PageCover from './pageCover';
import PageContent from './pageContent';

class passage extends Component {
  componentDidMount() {
    let scrollButton = document.getElementsByClassName("scrollButton")[0];
    scrollButton.style.top = "0px";
    window.scrollTo(0, 0);
  }

  render() { 
    return (  
      <React.Fragment>
        <HeaderNav/>
        <PageCover/>
        <PageContent
          id={this.props.match.params.id}
        />
        <Scroll myType="page"/>
      </React.Fragment>      
    );
  }
}
 
export default passage;