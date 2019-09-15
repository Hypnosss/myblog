import React, { Component } from 'react';
import marked from "marked";

class pageMain extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.getData = this.getData.bind(this);
    this.setState = this.setState.bind(this);
  }

  getData() {
    let xhr = new XMLHttpRequest();
    let data;
    let setState = this.setState;
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          data = xhr.responseText;
          // console.log(setState)
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
    // let id = this.state.id;
    // console.log(this.props.id)
    xhr.open('GET', 'http://49.235.198.10/api/' + this.props.id);
    xhr.send(null);
  }
  
  componentDidMount() {
    this.setState({
      id: this.props.id
    });
    // console.log(this.state.id)
    this.getData();
  }
  
  render() { 
    console.log(this.state.data)
    return (  
      <div className="pageMain">
        <div className="pageTitle">
          {this.state.data?this.state.data[0].title:1}
        </div>
        <div className="pageWords" dangerouslySetInnerHTML={{__html: this.state.data?marked(this.state.data[0].content):1}} >
        </div>
      </div>
    );
  }
}

 
export default pageMain;