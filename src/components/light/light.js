import React, {Component} from 'react';
import './light.css';
import {Link} from 'react-router-dom';

class Light extends Component {
  doRender() {
    var canvas1 = document.getElementById("canvas1");
    var ctx1 = canvas1.getContext("2d");
    var canvas2 = document.getElementById("canvas2");
    var ctx2 = canvas2.getContext("2d");

    const rowLength = 30;
    const columnLength = 20;
    let lightRadius = 600;
    // let canvasWidth = 900;
    // let canvasHeight = 800;
    let canvasWidth = document.documentElement.clientWidth;
    let canvasHeight = document.documentElement.clientHeight;
    // console.log(canvasWidth, canvasHeight)
    // console.dir(document.documentElement)
    let blockWidth = canvasWidth / rowLength;
    let blockHeight = canvasHeight / columnLength;
    // console.log(blockWidth, blockWidth*rowLength, canvasWidth, blockHeight, blockHeight*columnLength, canvasHeight)

    canvas1.width = canvasWidth;
    canvas2.width = canvasWidth;
    canvas1.height = canvasHeight;
    canvas2.height = canvasHeight;
    //canvas1在下面 用来绘制letters

    //16*16
    var str = `\
------------------------------\
-BBB-BBB-B--B-BBB-BBB-BBB-BBB-\
--B--B-B-BB-B-B-B-B-B-B-B-B-B-\
--B--BBB-B-BB-BBB-B-B-BBB-B-B-\
--B--B-B-B--B-B---BBB-B---BBB-\
------------------------------\
---B--B---BBB----B----B----B--\
--B--B-----B---BBBBB---B---BB-\
-BBBBBBB---B---B-B-B-BBBBB-B--\
-B-B---B--B----BBBB---B-B-BBB-\
-BBB-B-B-BBBB--BB-B---B-B-B-B-\
-B-B---B--B-B--B-B-----B--B-B-\
-BBB--BB--BBB-B-B-BB-BBBBBBBB-\
------------------------------\
-----------------------B------\
-BBB-B---B-BBB-B-B------B-----\
-B---B---B-B---BB--BBBBBBB----\
-B---B---B-B---BB-------B-----\
-BBB-BBB-B-BBB-B-B-----B------\
------------------------------`;

    var blocks = []; //where the light is unable to through

    //main
    drawBackground();

    canvas2.onmousemove = function(e) {
      ctx2.clearRect(0, 0, canvasWidth, canvasHeight);
      light(e.offsetX, e.offsetY);
    }

    function drawBackground() {
      for(let i = 0; i < str.length; i++) {
        let row = Math.floor(i / rowLength);
        let column = i - row * rowLength;
      
        if(str[i] === "B") {
          blocks.push([column, row]);
          drawBackgroundBlock(column, row, "orange");
        } else {
          drawBackgroundBlock(column, row, "black");
        }
      }
    }

    function light(x, y) {
      // draw circle
      ctx2.globalCompositeOperation = "source-over";
      let gra = ctx2.createRadialGradient(x, y, 0, x, y, lightRadius);
      gra.addColorStop(1, "transparent");
      gra.addColorStop(0, "white");
      ctx2.arc(x, y, lightRadius, 0, 2*Math.PI, "anticlockwise");
      ctx2.fillStyle = gra;
      ctx2.fill();
      
      // draw shadow
      for(let block of blocks) {
        let corners = {
          topLeft: {x: block[0] * blockWidth, y: block[1] * blockHeight},
          topRight: {x: (block[0]+1) * blockWidth, y: block[1] * blockHeight},
          bottomLeft: {x: block[0] * blockWidth, y: (block[1]+1) * blockHeight},
          bottomRight: {x: (block[0]+1) * blockWidth, y: (block[1]+1) * blockHeight},
        };
        if(x > block[0] * blockWidth && x < (block[0] + 1) * blockWidth && y > block[1] * blockHeight && y < (block[1] + 1) * blockHeight) {
          ctx2.globalCompositeOperation = "destination-out";
          ctx2.fillRect(0, 0, canvasWidth, canvasHeight);
          break;
        } else {
          let points = [];
          for(let corner in corners) {
            let dis = calDis(corners[corner].x, corners[corner].y, x, y);
            let xRatio = -(x - corners[corner].x) / dis;
            let yRatio = -(y - corners[corner].y) / dis;
            if(dis < lightRadius) {
              let difValue = lightRadius - dis;
              points.push({
                dis: dis,
                inside: {
                  x: corners[corner].x, 
                  y: corners[corner].y
                },
                outside: {
                  x: corners[corner].x + difValue * xRatio, 
                  y: corners[corner].y + difValue * yRatio
                }
              });
            }
          }
      
          if(points.length === 4) {
            points.sort((a, b) => a.dis - b.dis);
            ctx2.globalCompositeOperation = "destination-out";
            ctx2.fillStyle = "red";
            ctx2.beginPath();
            if(y > corners.topLeft.y && y < corners.bottomRight.y || x > corners.topLeft.x && x < corners.bottomRight.x) {
              ctx2.moveTo(points[1].inside.x, points[1].inside.y);
              ctx2.lineTo(points[0].inside.x, points[0].inside.y);
              ctx2.lineTo(points[0].outside.x, points[0].outside.y)
              ctx2.lineTo(points[2].outside.x, points[2].outside.y);
              ctx2.lineTo(points[3].outside.x, points[3].outside.y);
              ctx2.lineTo(points[1].outside.x, points[1].outside.y);
              ctx2.lineTo(points[1].inside.x, points[1].inside.y);
            } else {
              ctx2.moveTo(points[1].inside.x, points[1].inside.y);
              ctx2.lineTo(points[0].inside.x, points[0].inside.y);
              ctx2.lineTo(points[2].inside.x, points[2].inside.y);
              ctx2.lineTo(points[2].outside.x, points[2].outside.y);
              ctx2.lineTo(points[3].outside.x, points[3].outside.y);
              ctx2.lineTo(points[1].outside.x, points[1].outside.y);
              ctx2.lineTo(points[1].inside.x, points[1].inside.y);
            }
            ctx2.fill();
          } 
        }
      } 
    }

    //工具人
    function drawBackgroundBlock(x, y, color) {
      ctx1.fillStyle = color;
      ctx1.fillRect(x*blockWidth, y*blockHeight, blockWidth, blockHeight);
    }

    function calDis(x1, y1, x2, y2) {
      return Math.sqrt(Math.pow(x2-x1, 2) + Math.pow(y2-y1, 2));
    }
  }

  componentDidMount() {
    this.doRender();
  }

  render() { 
    return (
      <React.Fragment>
        <Link to="/start">
          <canvas id="canvas1"></canvas>
          <canvas id="canvas2"></canvas>
        </Link>
      </React.Fragment>
    );
  }
}
 
export default Light;
/* 
let str = `\
------------------------------\
-BBB-BBB-B--B-BBB-BBB-BBB-BBB-\
--B--B-B-BB-B-B-B-B-B-B-B-B-B-\
--B--BBB-B-BB-BBB-B-B-BBB-B-B-\
--B--B-B-B--B-B---BBB-B---BBB-\
------------------------------\
---B--B----BBB---B----B----B--\
--B--B------B--BBBBB---B---BB-\
-BBBBBBB----B--B-B-B-BBBBB-B--\
-B-B---B---B---BBBB---B-B-BBB-\
-BBB-B-B--BBBB-BB-B---B-B-B-B-\
-B-B---B---B-B-B-B-----B--B-B-\
-BBB--BB---BBBB-B-BB-BBBBBBBB-\
------------------------------\
-----------------------B------\
-BBB-B---B-BBB-B-B------B-----\
-B---B---B-B---BB--BBBBBBB----\
-B---B---B-B---BB-------B-----\
-BBB-BBB-B-BBB-B-B-----B------\`;

*/
