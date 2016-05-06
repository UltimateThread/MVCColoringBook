// Color to paint in the image
var paintColor = {
   a: 255,
   r: 0,
   g: 0,
   b: 255
};
var currentImage;

// Get the canvas element from the HTML
var canvas = document.getElementById('imageView');
var canvasRedCircle = document.getElementById('colorCircleRed');
var canvasOrangeCircle = document.getElementById('colorCircleOrange');
var canvasYellowCircle = document.getElementById('colorCircleYellow');
var canvasGreenCircle = document.getElementById('colorCircleGreen');
var canvasBlueCircle = document.getElementById('colorCircleBlue');
var canvasPurpleCircle = document.getElementById('colorCirclePurple');
var canvasPinkCircle = document.getElementById('colorCirclePink');

// Get the 2D context from the canvas element
context = canvas.getContext('2d');
contextRedCircle = canvasRedCircle.getContext('2d');
contextOrangeCircle = canvasOrangeCircle.getContext('2d');
contextYellowCircle = canvasYellowCircle.getContext('2d');
contextGreenCircle = canvasGreenCircle.getContext('2d');
contextBlueCircle = canvasBlueCircle.getContext('2d');
contextPurpleCircle = canvasPurpleCircle.getContext('2d');
contextPinkCircle = canvasPinkCircle.getContext('2d');

// Add event listeners
document.getElementById('imageView').addEventListener("click", updateImage);
document.getElementById('colorCircleRed').addEventListener("click", updateColor);
document.getElementById('colorCircleOrange').addEventListener("click", updateColor);
document.getElementById('colorCircleYellow').addEventListener("click", updateColor);
document.getElementById('colorCircleGreen').addEventListener("click", updateColor);
document.getElementById('colorCircleBlue').addEventListener("click", updateColor);
document.getElementById('colorCirclePurple').addEventListener("click", updateColor);
document.getElementById('colorCirclePink').addEventListener("click", updateColor);
document.getElementById('submitUrl').addEventListener("click", loadImage);

// Style the canvas to center in the browser
var style = canvas.style;
style.marginLeft = "auto";
style.marginRight = "auto";
style.marginTop = "25px";
style.marginBottom = "25px";
var parentStyle = canvas.parentElement.style;
parentStyle.textAlign = "center";
parentStyle.width = "100%";

// Set the image into the canvas
var img = new Image();
currentImage = "images/ColoringPages/forest.jpg";
img.src = currentImage;
img.onload = function () {
   context.drawImage(img, 0, 0, img.width, img.height, 0, 0, canvas.width, canvas.height);
};

// Set the color circle images into the canvas
/* ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
var imgRedCircle = new Image();
imgRedCircle.src = "images/red_circle.png";
imgRedCircle.onload = function () {
   contextRedCircle.drawImage(imgRedCircle, 0, 0, imgRedCircle.width, imgRedCircle.height, 0, 0, canvasRedCircle.width, canvasRedCircle.height);
};

var imgOrangeCircle = new Image();
imgOrangeCircle.src = "images/orange_circle.png";
imgOrangeCircle.onload = function () {
   contextOrangeCircle.drawImage(imgOrangeCircle, 0, 0, imgOrangeCircle.width, imgOrangeCircle.height, 0, 0, canvasOrangeCircle.width, canvasOrangeCircle.height);
};

var imgYellowCircle = new Image();
imgYellowCircle.src = "images/yellow_circle.png";
imgYellowCircle.onload = function () {
   contextYellowCircle.drawImage(imgYellowCircle, 0, 0, imgYellowCircle.width, imgYellowCircle.height, 0, 0, canvasYellowCircle.width, canvasYellowCircle.height);
};

var imgGreenCircle = new Image();
imgGreenCircle.src = "images/green_circle.png";
imgGreenCircle.onload = function () {
   contextGreenCircle.drawImage(imgGreenCircle, 0, 0, imgGreenCircle.width, imgGreenCircle.height, 0, 0, canvasGreenCircle.width, canvasGreenCircle.height);
};

var imgBlueCircle = new Image();
imgBlueCircle.src = "images/blue_circle.png";
imgBlueCircle.onload = function () {
   contextBlueCircle.drawImage(imgBlueCircle, 0, 0, imgBlueCircle.width, imgBlueCircle.height, 0, 0, canvasBlueCircle.width, canvasBlueCircle.height);
};

var imgPurpleCircle = new Image();
imgPurpleCircle.src = "images/purple_circle.png";
imgPurpleCircle.onload = function () {
   contextPurpleCircle.drawImage(imgPurpleCircle, 0, 0, imgPurpleCircle.width, imgPurpleCircle.height, 0, 0, canvasPurpleCircle.width, canvasPurpleCircle.height);
};

var imgPinkCircle = new Image();
imgPinkCircle.src = "images/pink_circle.png";
imgPinkCircle.onload = function () {
   contextPinkCircle.drawImage(imgPinkCircle, 0, 0, imgPinkCircle.width, imgPinkCircle.height, 0, 0, canvasPinkCircle.width, canvasPinkCircle.height);
};
/* ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- */

// Update the color depending on which color circle is clicked
function updateColor(sender, e) {
   switch (sender.srcElement.id) {
      case "colorCircleRed":
         paintColor = { a: 255, r: 255, g: 0, b: 0 };
         break;
      case "colorCircleOrange":
         paintColor = { a: 255, r: 255, g: 165, b: 0 };
         break;
      case "colorCircleYellow":
         paintColor = { a: 255, r: 255, g: 255, b: 0 };
         break;
      case "colorCircleGreen":
         paintColor = { a: 255, r: 0, g: 255, b: 0 };
         break;
      case "colorCircleBlue":
         paintColor = { a: 255, r: 0, g: 0, b: 255 };
         break;
      case "colorCirclePurple":
         paintColor = { a: 255, r: 160, g: 32, b: 240 };
         break;
      case "colorCirclePink":
         paintColor = { a: 255, r: 255, g: 105, b: 180 };
         break;
   }
}

// Load a new image into the canvas
function loadImage() {
   $.ajax({
      type: "POST",
      url: "/Home/UploadImage",
      dataType: "json",
      data: {
         urlString: document.getElementById('urlInput').value
      },
      error: function (response) {
         alert('failed');
      },
      success: function (response) {
         if (response.success == true) {

         alert('Success - ' + response.result);
         // Set the image into the canvas
         var img = new Image();
         currentImage = response.result;
         img.src = 'images/ColoringPages/' + currentImage;
         img.onload = function () {
            context.drawImage(img, 0, 0, img.width, img.height, 0, 0, canvas.width, canvas.height);
         };
         }
         else {
            alert('Failure - ' + response.error);
         }
      }
   });
}

// Call the floodfill method when the user clicks a part of the canvas
function updateImage(e) {
   // Get the postion of the cursor
   var xPos = e.pageX - this.offsetLeft;
   var yPos = e.pageY - this.offsetTop;

   floodfill(xPos, yPos, paintColor, context, img.width, img.height, 15);
}

//Floodfill functions
function floodfill(x, y, fillcolor, ctx, width, height, tolerance) {
   var img = ctx.getImageData(0, 0, width, height);
   var data = img.data;
   var length = data.length;
   var Q = [];
   var i = (x + y * width) * 4;
   var e = i, w = i, me, mw, w2 = width * 4;
   var targetcolor = [data[i], data[i + 1], data[i + 2], data[i + 3]];
   if (data[i] < 20 && data[i + 1] < 20 && data[i + 2] < 20)
      return;
   var targettotal = data[i] + data[i + 1] + data[i + 2] + data[i + 3];

   if (!pixelCompare(i, targetcolor, targettotal, fillcolor, data, length, tolerance)) {
      return false;
   }

   Q.push(i);
   while (Q.length) {
      i = Q.pop();
      if (pixelCompareAndSet(i, targetcolor, targettotal, fillcolor, data, length, tolerance)) {
         e = i;
         w = i;
         mw = parseInt(i / w2) * w2; //left bound
         me = mw + w2;	//right bound			
         while (mw < (w -= 4) && pixelCompareAndSet(w, targetcolor, targettotal, fillcolor, data, length, tolerance)); //go left until edge hit
         while (me > (e += 4) && pixelCompareAndSet(e, targetcolor, targettotal, fillcolor, data, length, tolerance)); //go right until edge hit
         for (var j = w; j < e; j += 4) {
            if (j - w2 >= 0 && pixelCompare(j - w2, targetcolor, targettotal, fillcolor, data, length, tolerance)) Q.push(j - w2); //queue y-1
            if (j + w2 < length && pixelCompare(j + w2, targetcolor, targettotal, fillcolor, data, length, tolerance)) Q.push(j + w2); //queue y+1
         }
      }
   }
   ctx.putImageData(img, 0, 0);
}

function pixelCompare(i, targetcolor, targettotal, fillcolor, data, length, tolerance) {
   if (i < 0 || i >= length) return false; //out of bounds
   if (data[i + 3] === 0) return true;  //surface is invisible

   if (
		(targetcolor[3] === fillcolor.a) &&
		(targetcolor[0] === fillcolor.r) &&
		(targetcolor[1] === fillcolor.g) &&
		(targetcolor[2] === fillcolor.b)
	) return false; //target is same as fill

   if (
		(targetcolor[3] === data[i + 3]) &&
		(targetcolor[0] === data[i]) &&
		(targetcolor[1] === data[i + 1]) &&
		(targetcolor[2] === data[i + 2])
	) return true; //target matches surface 

   if (
		Math.abs(targetcolor[3] - data[i + 3]) <= (255 - tolerance) &&
		Math.abs(targetcolor[0] - data[i]) <= tolerance &&
		Math.abs(targetcolor[1] - data[i + 1]) <= tolerance &&
		Math.abs(targetcolor[2] - data[i + 2]) <= tolerance
	) return true; //target to surface within tolerance 

   return false; //no match
}

function pixelCompareAndSet(i, targetcolor, targettotal, fillcolor, data, length, tolerance) {
   if (pixelCompare(i, targetcolor, targettotal, fillcolor, data, length, tolerance)) {
      //fill the color
      data[i] = fillcolor.r;
      data[i + 1] = fillcolor.g;
      data[i + 2] = fillcolor.b;
      data[i + 3] = fillcolor.a;
      return true;
   }
   return false;
}
