//Global Variables
var selectedShape;
var currentOutlineColor;
var currentFillColor;
var currentLineWidth;
var currentMode;
var isMouseDown = false;
var drawnShapes = []
var canvas;
var context;
var currentShape;
var lastShape;
var selectedIndex;
var shape;
var currShape = null;
var x1Dif;
var x2Dif;
var y1Dif;
var y2Dif;
var enableCopy = false;
var enableResize = false;
var copiedShape;
var resizeShape;
var newCopyShape;
var newResize;


window.onload = function() {

	
	canvas = document.getElementById("canvas");
	canvas.onmousedown = canvasClick;
	context = canvas.getContext("2d");
	fillColor = document.getElementById("fillColor");
	outlineColor = document.getElementById("outlineColor");
	lineWidth = document.getElementById("lineWidth");
	shapeType = document.getElementById("shape");
	currMode = document.getElementById("mode");
	//Set Select defaults
	fillColor.options[0].defaultSelected = true;
	outlineColor.options[0].defaultSelected = true;
	lineWidth.options[0].defaultSelected = true;
	shapeType.options[0].defaultSelected = true;
	currMode.options[0].defaultSelected = true;
	
	//get Modes and properties
	setFillColor();
	setOutlineColor();
	setCurrentShape();
	setLineWidth();
	setCurrentMode();
	
	//On change make the change and check to see if any shape is selected and make the change
	shapeType.onchange = setCurrentShape;
	fillColor.onchange = setFillColor;
	outlineColor.onchange = setOutlineColor;
	lineWidth.onchange = setLineWidth;
	currMode.onchange = setCurrentMode;
	
	
	
	
	
};

//Copies the Selected image and initializes the copiedShape variable which will be modified a click is made.

	function confirmCopy(){

	if (currentMode == "Select"){
	if (!enableCopy){
		enableCopy = true;
		
	for(var i= 0 ;i <=drawnShapes.length-1; i++) {
			n = drawnShapes.length;
			if (drawnShapes[i].isSelected){
			
					copiedShape = copy(drawnShapes[i]);
					return;
			}
			
	}
		
	}
	if (enableCopy){
		enableCopy = false;
		copiedShape =null;
	} 

	}
}

	//Draw the small circles on the Resize option
	function drawSelectors(shape){
		canvas = document.getElementById("canvas");
		draw = canvas.getContext("2d");

		draw.beginPath();
		draw.arc(shape.x1,shape.y1,5,0,2*Math.PI);
		draw.fillStyle = "#00FF99";
		draw.stroke();
		draw.closePath();
		draw.beginPath();
		draw.arc(shape.x2,shape.y2,5,0,2*Math.PI);
		draw.fillStyle = "#00FF99";
		draw.stroke();
		draw.closePath();


	}

  //Resizes the selected Image and sets newReSize variable to be resized
	function confirmResize(){

	if(currentMode == "Select"){
		if (!enableResize){
			enableResize = true;
		
			for(var i= 0 ;i <=drawnShapes.length-1; i++) {
					n = drawnShapes.length;
					if (drawnShapes[i].isSelected){
							
							canvas = document.getElementById("canvas");
							draw = canvas.getContext("2d");
							//draw.clearRect(0, 0, canvas.width, canvas.height);
							newReSize = copy(drawnShapes[i]);
							newReSize.isSelected = true;
							//resizeShape = drawnShapes[i];
							drawSelectors(drawnShapes[i]);
							drawnShapes.splice(i,1);
							
							
							return;
					
				
				
					}

			}
		}	
	}
		if (enableResize){
			if (newReSize != null){
			enableResize = false;
			drawnShapes.push(newReSize);
			newResize = null;
			canvas = document.getElementById("canvas");
			draw = canvas.getContext("2d");
			draw.clearRect(0, 0, canvas.width, canvas.height);
			drawShapes();
			}
		} 


	}

	//Creates a copy of the selected Shape but does not set the isSelected variable of the shape by design choice
	function copy(shape){
		var returnShape;
		if (shape == null){
		
			return null;
		}
		if (shape.getType() == "Line"){
		
			returnShape = new Line("canvas",shape.x1,shape.y1,shape.x2,shape.y2,shape.width,shape.color)
			
		
		}
		if (shape.getType() == "Rectangle"){
		
			returnShape = new Rectangle("canvas",shape.x1,shape.y1,shape.x2,shape.y2,shape.width,shape.color,shape.fill)
			
		
		}
		
		if (shape.getType() == "Triangle"){
		
			returnShape = new Triangle("canvas",shape.x1,shape.y1,shape.x2,shape.y2,shape.width,shape.color,shape.fill)
			
		
		}
		
		return returnShape;


	}

//Deletes the Selected shape from drawnShapes array
	function confirmDelete(){


			for(var i= 0 ;i <=drawnShapes.length-1; i++) {
				n = drawnShapes.length;
				if (drawnShapes[i].isSelected){
						drawnShapes.splice(i,1);
						canvas = document.getElementById("canvas");
						draw = canvas.getContext("2d");
						draw.clearRect(0, 0, canvas.width, canvas.height);
						drawShapes();
						return;
						
				}
			
			}


	}
	
	//Sets the currentMode on the change of the DropDown

	function setCurrentMode(){
			
		e = document.getElementById("mode");
		currentMode =  e.options[e.selectedIndex].text;
		isMouseDown = false;
		for(var i=0; i<= drawnShapes.length -1; i++) {
			
			if (drawnShapes[i].isSelected){
					drawnShapes[i].isSelected = false;
			}
			
		}
		// If Shape was being moved add this shape to the drawnShapes
		if (currShape != null ){
					newShape = copy(currShape);
					drawnShapes.push(newShape);
		}
		// If Shape was being resized add this shape to the drawnShapes
		if (newResize != null ){
				drawnShapes.push(newResize);
				newResize == null;
			
		}
		
		canvas = document.getElementById("canvas");
		draw = canvas.getContext("2d");
		draw.clearRect(0, 0, canvas.width, canvas.height);
		drawShapes();
		enableCopy = false;
		enableResize = false;
	};
	
	
	
	//Set the currentShape on change of the correspondong DropDown
	function setCurrentShape(){
		e = document.getElementById("shape");
		
		selectedShape = e.options[e.selectedIndex].text;


	};

	// Change the FillColor onchange of the dropdown
	function setFillColor(){

		e = document.getElementById("fillColor");
		
		currentFillColor = e.options[e.selectedIndex].text;
		//Change the FillColor of the Selected shape
		for(var i=drawnShapes.length-1; i>=0; i--) {
			
			if (drawnShapes[i].isSelected){
					drawnShapes[i].fill = currentFillColor;
			}
		
		}
		canvas = document.getElementById("canvas");
		draw = canvas.getContext("2d");
		draw.clearRect(0, 0, canvas.width, canvas.height);
		drawShapes();



	};

	//Change the outline Color on change of the dropdown
	function setOutlineColor(){
		e = document.getElementById("outlineColor");
		
		currentOutlineColor = e.options[e.selectedIndex].text;



	};

	//Change the LineWidth on change of the dropdown
	function setLineWidth(){

		e = document.getElementById("lineWidth");
		
		currentLineWidth = e.options[e.selectedIndex].value;
		//change the linewidth for the selectedShape
		for(var i=drawnShapes.length-1; i>=0; i--) {
			
			if (drawnShapes[i].isSelected){
					drawnShapes[i].width = currentLineWidth;
			}
		
		}
		canvas = document.getElementById("canvas");
		draw = canvas.getContext("2d");
		draw.clearRect(0, 0, canvas.width, canvas.height);
		drawShapes();


	};

	//Line Type which creates the Lines
	function Line(canvas,x1,y1,x2,y2,width,color){
		this.canvas = document.getElementById(canvas)
		this.context = this.canvas.getContext("2d");
		this.x1 = x1;
		this.y1 = y1;
		this.x2 = x2;
		this.y2 = y2;
		this.width = width;
		this.color = color;
		this.isSelected = false;
		
		this.draw = function () {
			 this.context.globalAlpha = 0.85;
			this.context.beginPath();
			this.context.moveTo(this.x1,this.y1);
			this.context.lineTo(this.x2,this.y2);
			
			if (this.isSelected) {
				this.context.strokeStyle = "#00FF99";
				this.context.lineWidth = this.width;	
			}
			else {
				this.context.strokeStyle = this.color;
				this.context.lineWidth = this.width;
			}
			
			this.context.stroke();
		}
		
		this.testHit = function(testX,testY) {
		//Idea Obtained from the forum http://forums.codeguru.com/showthread.php?194400-Distance-between-point-and-line-segment
		//Distance between point and line segment
		num = (this.x1 - this.x2)*(this.y2 - testY) - (this.x2 - testX)*(this.y1 - this.y2);
		denom = (this.x2-this.x1)*(this.x2 - this.x1) +(this.y2 - this.y1)*(this.y2 - this.y1);
		distance =  Math.abs(num)/ Math.sqrt(denom);
		if  ( distance < 20 && distance > -20 ) 
			return true;
		return false;

		}

		this.getType = function (){
			return "Line";
		}
	}


	//Rectangle Type which creates the Rectangles
	function Rectangle(canvas,x1,y1,x2,y2,width,color,fill){
		this.canvas = document.getElementById(canvas)
		this.context = this.canvas.getContext("2d");
		this.x1 = x1;
		this.y1 = y1;
		this.x2 = x2;
		this.y2 = y2;
		this.width = width;
		this.color = color;
		this.fill = fill
		this.isSelected = false;
		
		this.draw = function () {
			 this.context.globalAlpha = 0.85;
			this.context.beginPath();
			this.context.rect(this.x1, this.y1, this.x2 - this.x1, this.y2 - this.y1);
			this.context.fillStyle = this.fill;
			this.context.strokeStyle = this.color;
			if (this.isSelected) {
				this.context.strokeStyle = "#00FF99";
				this.context.lineWidth = this.width;	
			}
			else {
				this.context.strokeStyle = this.color;
				this.context.lineWidth = this.width;
			}
			
			
			this.context.fill()
			this.context.stroke();
			}
		
		this.testHit = function(testX,testY) {
			if (this.x1 < testX && this.x2 > testX &&
				this.y1 < testY && this.y2 > testY) 
				return true;
			return false;
		}
		this.getType  = function(){
			return "Rectangle";
		}

	}

	//Triangle type which draws the Triangles
	function Triangle(canvas,x1,y1,x2,y2,width,color,fill){
		this.canvas = document.getElementById(canvas)
		this.context = this.canvas.getContext("2d");
		this.x1 = x1;
		this.y1 = y1;
		this.x2 = x2;
		this.y2 = y2;
		this.width = width;
		this.color = color;
		this.fill = fill;
		this.isSelected = false;
		
		this.draw = function () {
			 this.context.globalAlpha = 0.85;
			this.context.beginPath();
			this.context.moveTo(this.x1,this.y1);
			this.context.lineTo(this.x2,this.y2);
			this.context.lineTo(this.x1 , this.y2);
			this.context.closePath();
			this.context.fillStyle = this.fill;
			this.context.strokeStyle = this.color;
			if (this.isSelected) {
				this.context.strokeStyle = "#00FF99";
				this.context.lineWidth = this.width;	
			}
			else {
				
				this.context.strokeStyle = this.color;
				this.context.lineWidth = this.width;
				
			}
			
			
			this.context.fill()
			this.context.stroke();
			}
		
		this.testHit = function(testX,testY) {
		//Idea based on http://stackoverflow.com/questions/13300904/determine-whether-point-lies-inside-triangle
	    //known as baycentric coordinates
			alpha = ((this.x1 - this.x2)*(testY - this.y2))/ ((this.x1 - this.x2)*(this.y1 - this.y2));
			beta = ((this.y2 - this.y1)*(testX - this.x1) + (this.x1 - this.x1)*(testY - this.y2))/ ((this.x1 - this.x2)*(this.y1 -this.y2));
			gamma = 1 - alpha - beta;
		if (alpha > 0 && beta > 0 && gamma > 0)	
			return true;
			return false;
		}
		
		this.getType = function(){
		
			return "Triangle";
		}

	}


	//Clears the Canvas
	function clearCanvas() {
		drawnShapes = [];
		//Update the display.
		draw.clearRect(0, 0, canvas.width, canvas.height);
	}
	
	//Draw all the shapes in the Shape array
	function drawShapes() {

		for(var i=0; i<drawnShapes.length; i++) {
			drawnShapes[i].draw();
			
		}
	}


	//Helper Function which creates the Shape that is to be drawn
	function checkShape(event){

			if ( selectedShape == "Line" ){
			currentShape = new Line("canvas",initalX,initalY,event.pageX,event.pageY,currentLineWidth,currentOutlineColor);
			}
			
			if ( selectedShape == "Square" ){
			currentShape = new Rectangle("canvas",initalX,initalY,event.pageX,event.pageY,currentLineWidth,currentOutlineColor,currentFillColor);
			
			}
			
			if ( selectedShape == "Triangle" ){
			currentShape = new Triangle("canvas",initalX,initalY,event.pageX,event.pageY,currentLineWidth,currentOutlineColor,currentFillColor);
			
			}


	}
	
	//The Main Class which initiates all the events that take place in the Canvas
	
	function canvasClick(event) {
		
		initalX = event.pageX;
		initalY = event.pageY;
		isMouseDown = true;
		
		

		$(document).ready(function(event){
		  $("canvas").bind("mousemove",function(event){
				
				// In the drawing mode
				if (currentMode == "Draw") {
					if (isMouseDown){
					canvas = document.getElementById("canvas");
					checkShape(event);
					draw = canvas.getContext("2d");
					draw.clearRect(0, 0, canvas.width, canvas.height);
					currentShape.draw();
					drawShapes();
					}
				}
				// On mouse Move move the selected Shape
				if (currentMode == "Select"){
					if (isMouseDown && currShape != null &&!enableCopy && !enableResize) {
					draw.clearRect(0, 0, canvas.width, canvas.height);
					currShape.x1 = event.pageX - x1Dif;
					currShape.y1 = event.pageY - y1Dif;
					currShape.x2 = event.pageX - x2Dif;
					currShape.y2 = event.pageY - y2Dif;
					drawShapes();
					currShape.draw();
					
					}
					// The Resize button is pressed
					if (isMouseDown && !enableCopy && enableResize){
						
							coord1 = false;
							coord2 = false;
							
							
							if ((Math.sqrt(Math.pow(newReSize.x1 - event.pageX, 2) + Math.pow(newReSize.y1 - event.pageY, 2))) < 30)
								coord1 = true;
							if ((Math.sqrt(Math.pow(newReSize.x2 - event.pageX, 2) + Math.pow(newReSize.y2 - event.pageY, 2))) < 30){
								coord2 = true;
								coord1 = false;
							 }
							if (coord1 || coord2){
								if (coord1){
									
									newReSize.x1 = event.pageX;
									newReSize.y1 = event.pageY;
									
								}
								
								if (coord2){
									newReSize.x2 = event.pageX;
									newReSize.y2 = event.pageY;
								
									}
								
								canvas = document.getElementById("canvas");
								draw = canvas.getContext("2d");
								draw.clearRect(0, 0, canvas.width, canvas.height);
								
								newReSize.draw();
								drawSelectors(newReSize);
								drawShapes();
							}

						}

					
					
				}
			
		  });
		  $("canvas").bind("mousedown",function(event){
			// While Mouse Down get the Selected Event
			isMouseDown = true;
			if (currentMode == "Select"){
				if (currShape == null && !enableCopy && !enableResize){
				getSelected(event);
				}
			}
			// While Mouse is Down and Copy is enabled
			if (enableCopy){
				newCopyShape = copy(copiedShape);
				temp1 = copiedShape.x1;
				temp2 = copiedShape.y1;
				newCopyShape.x1 = event.pageX;
				newCopyShape.y1 = event.pageY;
				newCopyShape.x2 = event.pageX + Math.abs(temp1 - copiedShape.x2);
				newCopyShape.y2 = event.pageY + Math.abs(temp2 - copiedShape.y2);
				drawShapes();
			}
			
		
		  });
		  
		  $("canvas").bind("mouseup",function(event){
			// On Mouseup draw the shape
			  if (currentMode == "Draw"){
				  if (isMouseDown) {
					isMouseDown = false;
					checkShape(event);
					
					canvas = document.getElementById("canvas");
					draw = canvas.getContext("2d");
					if (currentMode == "Draw") {
						if ((currentShape.x1 != currentShape.x2) && (currentShape.y2 != currentShape.y1)){
							drawnShapes.push(currentShape);
							drawShapes();
						}
					
						}
					}
			}
			if (currentMode == "Select"){
				
				newShape = copy(currShape);
				//On Mouse up add the moved shaped to the drawnShapes array
				if (isMouseDown && currShape !== null && !enableResize && !enableCopy){
					isMouseDown = false;
					if (newShape !== null) {

						if (lastShape !== null && lastShape === currShape) {
						lastShape = newShape;
						}
						newShape.isSelected = true;
						drawnShapes.push(newShape);
						
						canvas = document.getElementById("canvas");
						draw = canvas.getContext("2d");
						draw.clearRect(0, 0, canvas.width, canvas.height);
						drawShapes();
						currShape = null;
						x1Dif = 0;
						x2Dif = 0 ;
						y1Dif = 0;
						y2Dif = 0;
					}
				
				}
				
				//on Mouse up add the resized shape to the drawnShapes
				if (enableResize && isMouseDown && newReSize != null && !enableCopy) {
				
					drawnShapes.push(newReSize);
					newReSize = null;
					draw = canvas.getContext("2d");
					draw.clearRect(0, 0, canvas.width, canvas.height);
					drawShapes();
					isMouseDown = false;
					enableResize = false;
					confirmResize();
				
				}
				
				//on Mouse up add the copied shape to the drawnShapes
				if ( isMouseDown && enableCopy && !enableResize &&  newCopyShape != null){
						isMouseDown = false;
						drawnShapes.push(newCopyShape);
						drawShapes();
						newCopyShape = null;	
				}
			
			}

		
			});
		});

		
		
		
		
	}
	
	//On Click run all the testHit method for all the shapes in the array
	function getSelected (event){
	
		
			for(var i=drawnShapes.length-1; i>=0; i--) {
					testShape = drawnShapes[i];
	
					if (testShape.testHit(event.pageX,event.pageY)) {
							currShape = testShape;
				
					if (lastShape != null) 
						lastShape.isSelected = false;
					lastShape = currShape;
						
					currShape.isSelected = true;
					
					 
					drawnShapes.splice(i, 1);
					//Change the difference from the shape to the point, used for moving
					x1Dif = event.pageX - currShape.x1;
					y1Dif = event.pageY - currShape.y1;
					x2Dif = event.pageX - currShape.x2;
					y2Dif = event.pageY - currShape.y2 ;
					canvas = document.getElementById("canvas");
					draw = canvas.getContext("2d");
					draw.clearRect(0, 0, canvas.width, canvas.height);
					drawShapes();
					currShape.draw();
					return;
					
				}			
					
		}
	}		
	

	


