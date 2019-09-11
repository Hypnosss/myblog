import React, { Component } from 'react';

class mainCover extends Component {
  render() { 
    return (
      <div className="cover"> 
        <div className="coverImg"></div>
        <div className="avatarAndInfos">
          <div className="avatar"></div>
          <div className="infos">
            <span>タンポポでーす</span>
            <span>间歇性踌躇满志</span>
            <span>持续性混吃等死</span>
          </div>
        </div>
      </div>
    );
  }
}
 
export default mainCover;