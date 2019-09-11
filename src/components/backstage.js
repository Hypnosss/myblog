import React, { Component } from 'react';

class BackStage extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    let xhr = new XMLHttpRequest();
    let title = document.getElementById("input").value;
    let content = document.getElementById("content").value;
    let time = new Date();
    let obj = {
      title: title,
      content: content,
      time: time
    }
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          console.log("success!");
          document.getElementById("input").value = "";
          document.getElementById("content").value = "";
        } else {
          console.error(xhr.statusText);
        }
      }
    };

    xhr.onerror = function (e) {
      console.error(xhr.statusText);
    };
    xhr.open('POST', 'http://49.235.198.10/api/');

    xhr.send(JSON.stringify(obj));
  }

  render() { 
    return (  
      <div>
        高贵的后台
        <input id="input"/>
        <textarea id="content"></textarea>
        <button id="btn" onClick={this.handleClick}>submit</button>
      </div>
    );
  }
}
 
export default BackStage;