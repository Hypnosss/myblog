import React, { Component } from 'react';
import {Link} from 'react-router-dom';

import LinkToPassage from "./linkToPassage/linkToPassage";

class leftConent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null
    };
    this.getData = this.getData.bind(this);
    this.setState = this.setState.bind(this);
  }
  
  componentDidMount() {
    this.getData();
  }

  getData() {
    let xhr = new XMLHttpRequest();
    let data;
    let setState = this.setState;
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          data = xhr.responseText;
          // console.log(this)
          setState({data: JSON.parse(data)});
          // console.log("success!"+xhr.responseText);
        } else {
          // console.error(xhr.statusText);
        }
      }
    };

    xhr.onerror = function (e) {
      console.error(xhr.statusText);
    };
    xhr.open('GET', 'http://49.235.198.10/api/getPassages');
    xhr.send(null);
    
  }

  render() { 
    // console.log(this.state.data)
    let jsx = [];
    if(this.state.data) {
      // console.log(this.state.data)
      for(let data of this.state.data) {
        // console.log(data)
        let route = "passage/" + data._id;
        jsx.push(
          <Link to={route}
            key={data._id}  
          >
            <LinkToPassage
              title={data.title}
              content={data.content}
              type={data.type}
              id={data._id}
              time={data.time}
            />
          </Link>
        );
      }
    }
    return ( 
      <div className="leftContent">
        {jsx} 
      </div>
    );
  }
}
 
export default leftConent;