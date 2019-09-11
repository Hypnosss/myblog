import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class BackstageLogin extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      isAdministrator: false
    }
  }

  handleClick() {
    let name = document.getElementById("1").value;
    let pwd = document.getElementById("2").value;
    // console.log(name, pwd)
    if(name === "tanpopo" && pwd === "970406") {
      this.setState({
        isAdministrator: true
      })
    }
    if(this.state.isAdministrator) {
      console.log(1)
    }
  }
  render() { 
    console.log(1)
    let enter = null;
    if(this.state.isAdministrator) {
      enter = <Link to="/backstagedasnofhoasdnhaos">神秘链接</Link>
      console.log(2)
    }
    return (  
      <div className="backstage">
        <textarea id="1"></textarea>
        <textarea id="2"></textarea>
        <button id="btn" onClick={this.handleClick}>1</button>
        {enter}
      </div>
    );
  }
}
 
export default BackstageLogin;