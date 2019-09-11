import React, { Component } from 'react';

class scroll extends Component {
  constructor(props) {
    super(props);
    this.wheelToScroll = this.wheelToScroll.bind(this);
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.state = {
      mouseDownOnScroll: false,
      mouseDownOnScrollButton: false,
      buttonHeight: 200,
      scrolltimes: 0,
      timeStamp: 0,
    }
  }

  wheelToScroll(e) {
    if(this.state.timeStamp) {
      let lastScrollTimeStamp = this.state.timeStamp;
      let disTime = e.timeStamp - lastScrollTimeStamp;
      // console.log(disTime);
      if(disTime < 300) {
        let scrolltimes = this.state.scrolltimes;
        scrolltimes++;
        this.setState({
          scrolltimes: scrolltimes
        })
      } else {
        this.setState({
          scrolltimes: 0
        })
      }
    }
    let scrolltimes = this.state.scrolltimes;
    this.setState({
      timeStamp: e.timeStamp
    })

    // if(scrolltimes > 20) {
      // var e = document.createEvent("MouseEvents");
      // e.initEvent("click", true, true);
      // console.log(e)
      // document.body.dispatchEvent(e);
      // console.log(this.state.scrolltimes)
    // } else {
      let cover = document.getElementsByClassName("cover").length > 0;
      let scrollButton = document.getElementsByClassName("scrollButton")[0];
      // console.dir(scrollButton)
      let usefulHeight = document.documentElement.clientHeight - scrollButton.clientHeight;
  
      let all = window.scrollY;
      let i = 1;
      let t = 24; 
      let simplet = 12;
      let buttonHeight = this.state.buttonHeight;
  
      if(e.deltaY >= 0) {
        if(cover && window.scrollY < window.innerHeight - 50) {
          document.removeEventListener("mousewheel", this.wheelToScroll);
          function step(timestamp) {
            i++;
            let newScrollY;
            if(i <= t / 2) {
              newScrollY = all + Math.pow(i, 2) / Math.pow(t, 2) * 2 * (window.innerHeight - 50 - all);
            } else {
              newScrollY = all + (window.innerHeight - 50 - all) - Math.pow((i - t), 2) / Math.pow(t, 2) * 2 * (window.innerHeight - 50 - all);
            }
            window.scrollTo(0, Math.floor(newScrollY));
            scrollButton.style.top = newScrollY / (document.body.scrollHeight - document.documentElement.clientHeight) * usefulHeight + "px";
            if(i < t) {
              window.requestAnimationFrame(step);
            }
          } 
          window.requestAnimationFrame(step);
          setTimeout(() => {
            document.addEventListener("mousewheel", this.wheelToScroll);
          }, t / 60 * 1000);
        } else {
          function step(timestamp) {
            let t = simplet;
            i++;
            let newScrollY;
            if(i <= t / 2) {
              newScrollY = all + Math.pow(i, 2) / Math.pow(t, 2) * 2 * buttonHeight;
            } else {
              newScrollY = all + buttonHeight - Math.pow((i - t), 2) / Math.pow(t, 2) * 2 * buttonHeight;
            }
            window.scrollTo(0, Math.floor(newScrollY));
            // console.log(newScrollY / (document.body.scrollHeight - document.documentElement.clientHeight) * usefulHeight)
            scrollButton.style.top = [newScrollY / (document.body.scrollHeight - document.documentElement.clientHeight) * usefulHeight, 0, usefulHeight].sort((a, b)=>a-b)[1] + "px";
            if(i < t) {
              window.requestAnimationFrame(step);
            }
          } 
          window.requestAnimationFrame(step);
        }
      } else {
        if(cover && window.scrollY <= window.innerHeight - 50) {
          document.removeEventListener("mousewheel", this.wheelToScroll);
          function step(timestamp) {
            i++;
            let newScrollY;
            if(i <= t / 2) {
              newScrollY = all - (Math.pow(i, 2) / Math.pow(t, 2) * 2 * (all));
            } else {
              newScrollY = all - ((all) - Math.pow((i - t), 2) / Math.pow(t, 2) * 2 * (all));
            }
            window.scrollTo(0, Math.floor(newScrollY));
            scrollButton.style.top = newScrollY / (document.body.scrollHeight - document.documentElement.clientHeight) * usefulHeight + "px";
            if(i < t) {
              window.requestAnimationFrame(step);
            }
          } 
          window.requestAnimationFrame(step);
          setTimeout(() => {
            document.addEventListener("mousewheel", this.wheelToScroll);
          }, t / 60 * 1000);
        } else {
          function step(timestamp) {
            let t = simplet;
            i++;
            let newScrollY;
            if(i <= t / 2) {
              newScrollY = all - (Math.pow(i, 2) / Math.pow(t, 2) * 2 * buttonHeight);
            } else {
              newScrollY = all - (buttonHeight - Math.pow((i - t), 2) / Math.pow(t, 2) * 2 * buttonHeight);
            }
            window.scrollTo(0, Math.floor(newScrollY));
            // console.log(newScrollY / (document.body.scrollHeight - document.documentElement.clientHeight) * usefulHeight)
            scrollButton.style.top = [newScrollY / (document.body.scrollHeight - document.documentElement.clientHeight) * usefulHeight, 0, usefulHeight].sort((a, b)=>a-b)[1] + "px";
            if(i < t) {
              window.requestAnimationFrame(step);
            }
          } 
          window.requestAnimationFrame(step);
        }
      }
    // }
  }

  handleMouseDown(e) {
    let scroll = document.getElementsByClassName("scroll")[0];
    let scrollButton = document.getElementsByClassName("scrollButton")[0];
    if(e.target === scroll) {
      scrollButton.classList.remove("pressing");
      scroll.classList.add("pressing");
      e.preventDefault();
      this.setState({
        mouseDownOnScroll: true,
        mouseDownOnScrollButton: false
      })
    } else if(e.target === scrollButton) {
      scrollButton.classList.add("pressing");
      scroll.classList.remove("pressing");
      e.preventDefault();
      this.setState({
        mouseDownOnScroll: false,
        mouseDownOnScrollButton: true,
        mouseDownYToButtonTop: e.offsetY,
        buttonYtoTop: +scrollButton.style.top.slice(0, scrollButton.style.top.length - 2)
      })
    } else {
      this.setState({
        mouseDownOnScroll: false,
        mouseDownOnScrollButton: false
      })
    }
  }

  handleMouseMove(e) {
    let scrollButton = document.getElementsByClassName("scrollButton")[0];
    if(this.state.mouseDownOnScrollButton) {
      let startY = this.state.mouseDownYToButtonTop + this.state.buttonYtoTop;
      let nowY = e.clientY; 
      let deltaY = nowY - startY;
      if(this.state.buttonYtoTop + deltaY > document.documentElement.clientHeight - this.state.buttonHeight) {
        scrollButton.style.top = document.documentElement.clientHeight - this.state.buttonHeight + "px";
        window.scrollTo(0, document.body.scrollHeight - document.documentElement.clientHeight);
      } else if(this.state.buttonYtoTop + deltaY < 0) {
        scrollButton.style.top = 0 + "px";
        window.scrollTo(0, 0);
      } else {
        scrollButton.style.top = this.state.buttonYtoTop + deltaY + "px";
        window.scrollTo(0, (this.state.buttonYtoTop + deltaY) / (document.documentElement.clientHeight - this.state.buttonHeight) * (document.body.scrollHeight - document.documentElement.clientHeight));
      }
    }
  }

  handleMouseUp() {
    let scroll = document.getElementsByClassName("scroll")[0];
    let scrollButton = document.getElementsByClassName("scrollButton")[0];
    scrollButton.classList.remove("pressing");
    scroll.classList.remove("pressing");
    this.setState({
      mouseDownOnScroll: false,
      mouseDownOnScrollButton: false
    })
  }

  componentDidMount() {
    document.addEventListener("mousewheel", this.wheelToScroll);
    document.addEventListener("mousedown", this.handleMouseDown);
    document.addEventListener("mousemove", this.handleMouseMove);
    document.addEventListener("mouseup", this.handleMouseUp);

    let scrollButton = document.getElementsByClassName("scrollButton")[0];
    let usefulHeight = document.documentElement.clientHeight - scrollButton.clientHeight;
    scrollButton.style.top = window.scrollY / (document.body.scrollHeight - document.documentElement.clientHeight) * usefulHeight + "px";
  }

  componentWillUnmount() {
    document.removeEventListener("mousewheel", this.wheelToScroll);
    document.removeEventListener("mousedown",this.handleMouseDown);
    document.removeEventListener("mousemove", this.handleMouseMove);
    document.removeEventListener("mouseup", this.handleMouseUp);
  }

  render() { 
    return (  
      <div className="scroll">
        <div className="scrollButton"></div>
      </div>
    );
  }
}
 
export default scroll;