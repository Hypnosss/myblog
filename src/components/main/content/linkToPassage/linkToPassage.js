import React, { Component } from 'react';


class linkToPassage extends Component {
  render() { 
    // console.log(this.props.time)
    let time, renderTime;
    if(this.props.time) {
      let weekArr = ["日", "一", "二", "三", "四", "五" ,"六"];
      let time = new Date(this.props.time);
      let year = time.getFullYear();
      let month = time.getMonth();
      let date = time.getDate();
      let dayOfWeek = time.getDay();
      let hour = time.getHours();
      let min = time.getMinutes();
      let second = time.getSeconds();
      renderTime = year + "年" + month + "月" + date + "日 " + "周" + weekArr[dayOfWeek] + " " + hour + ":" + min + ":" + second;
    }
    return (  
      <div className="linkToPassage">
        <div className="bgImage"></div>
        <div className="passageTitle">
          {this.props.title}
        </div>
        <div className="passageAbbreviation">{this.props.content.length <= 60 ? this.props.content : this.props.content.slice(0, 60) + "..."}</div>
        <div className="passageInfos">{renderTime}</div>
      </div>
    );
  }
}
 
export default linkToPassage;