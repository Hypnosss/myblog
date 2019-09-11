import React, { Component } from 'react';

class headerNav extends Component {
  constructor(props) {
    super(props);
    this.ifHeaderIsOnTop = this.ifHeaderIsOnTop.bind(this);
  }

  ifHeaderIsOnTop(e) {
    // console.dir(e);
    let header = document.getElementsByClassName("headerNav")[0];
    if(window.scrollY !== 0) {
      header.classList.add("notOnTop");
    } else {
      header.classList.remove("notOnTop");
    }
  }

  componentDidMount() {
    document.addEventListener("scroll", this.ifHeaderIsOnTop);
  }

  componentWillUnmount() {
    document.removeEventListener("scroll", this.ifHeaderIsOnTop);
  }
  
  render() { 
    return (  
      <div className="headerNav">
        <span>tanpopo的破站</span>
        <ul>
          <li>1</li>
          <li>1</li>
          <li>1</li>
        </ul>
      </div>
    );
  }
}
 
export default headerNav;