import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class rightInfos extends Component {
  constructor(props) {
    super(props);
    this.changeRightInfosPosition = this.changeRightInfosPosition.bind(this);
    this.leftOrRight = this.leftOrRight.bind(this);
  }

  changeRightInfosPosition() {
    let rightInfos = document.getElementsByClassName("rightInfos")[0];
    let y;
    if(this.props.myType === "page") {
      y = 0.3 * window.innerHeight;
    } else {
      y = window.innerHeight;
    }
    if(window.scrollY >= y - 50) {
      rightInfos.classList.add("fixed");
    } else {
      rightInfos.classList.remove("fixed");
    }
  }
  
  leftOrRight() {
    let rightInfos = document.getElementsByClassName("rightInfos")[0];
    if(window.innerWidth < 1350) {
      rightInfos.classList.add("leftTooClose")
    } else {
      rightInfos.classList.remove("leftTooClose")
    }
    // console.log(window)
  }

  componentDidMount() {
    document.addEventListener("scroll", this.changeRightInfosPosition);
    window.addEventListener("resize", this.leftOrRight);
    this.leftOrRight();
  }
  
  componentWillUnmount() {
    document.removeEventListener("scroll", this.changeRightInfosPosition);
    window.removeEventListener("resize", this.leftOrRight);
  }
  
  render() { 
    return (  
      <React.Fragment>
      <div className="rightInfosAlternative"></div>
      <div className="rightInfos">
          <div className="backgroundImage"></div>
          <div className="words">
            <div className="intro">
              <span>tanpopo 也可以叫我
                <Link to="/backstageLogin">鸭鸭~</Link>
              </span>
            </div>
            <div className="icons">
              <ul className="iconList">
                <li>
                  <a href="https://www.zhihu.com/people/liu-wu-wei-47/activities">
                    <i className="iconfont icon-zhihu"></i>
                  </a>
                </li>
                <li>
                  <a href="https://github.com/Hypnosss">
                    <i className="iconfont icon-github"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="rightAvatar"></div>
      </div>
      </React.Fragment>
    );
  }
}
 
export default rightInfos;