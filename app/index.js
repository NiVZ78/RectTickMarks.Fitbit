import document from "document";

// Settings
let minuteWidth = 2;
let hourWidth = 8;

let minuteLength = 12;
let hourLength = 20;

let showMinutes = true;
let showHours = true;

let minuteColour = "white";
let hourColour = "red";


//Get the SVG placeholders
let tickrect = document.getElementById("tickrect");
let tickmarks = document.getElementsByClassName("minutes");

function getPointOnRect(x, y, w, h, angle) {
  let sin = Math.sin(angle), cos = Math.cos(angle); // Calculate once and store, to make quicker and cleaner
  let dy = sin>0 ? (h/2) : (0-h)/2; // Distance to top or bottom edge (from center)
  let dx = cos>0 ? (w/2) : (0-w)/2; // Distance to left or right edge (from center)

  if(Math.abs(dx*sin) < Math.abs(dy*cos)) { // if (distance to vertical line) < (distance to horizontal line)
    dy = (dx * sin) / cos; // calculate distance to vertical line
  } else { // else: (distance to top or bottom edge) < (distance to left or right edge)
    dx = (dy * cos) / sin; // move to top or bottom line
  }
  return { x: dx+x+(w/2), y: dy+y+(h/2) }; // Return point on rectangle
}



function drawTicks(){
  for (var index=0; index<60; index++){
    
    // Calculate the INNER point
    if (index%5){
      // Minutes
      let point1 = getPointOnRect(tickrect.x+minuteLength, tickrect.y+minuteLength, tickrect.width-(minuteLength*2), tickrect.height-(minuteLength*2), ((index-15)/60) * 2 * Math.PI);  
      
      tickmarks[index].style.display = showMinutes ? "inline" : "none";
      tickmarks[index].style.fill = minuteColour;
        
    } else {
      // Hours
      let point1 = getPointOnRect(tickrect.x+hourLength, tickrect.y+hourLength, tickrect.width-(hourLength*2), tickrect.height-(hourLength*2), ((index-15)/60) * 2 * Math.PI); 
      
      tickmarks[index].style.display = showHours ? "inline" : "none";
      tickmarks[index].style.fill = hourColour;
    }
    
    // Calculate the outer point
    let point2 = getPointOnRect(tickrect.x, tickrect.y, tickrect.width, tickrect.height, ((index-15)/60) * 2 * Math.PI);
    
    // Update the inner line point
    tickmarks[index].x1 = point1.x;
    tickmarks[index].y1 = point1.y;
    
    // Update the outer line point
    tickmarks[index].x2 = point2.x;
    tickmarks[index].y2 = point2.y;
    
    // Make the hour points thicker - NOT SUPPORTED YET! SOON(TM)
    /*
    if (index%5 ===0){
      tickmarks[index].strokeWidth = hourWidth;
    } else {
      tickmarks[index].strokeWidth = minuteWidth;
    }
    */
  }
}


drawTicks();
