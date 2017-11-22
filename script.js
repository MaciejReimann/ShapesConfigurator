
const model = {
	init: function() {
		this.addFeatures("height", 0);
		this.addFeatures("width", 0);
		this.addFeatures("iconNr", "")
	},
	// convertToString: function(x) {
	// 	return toStr

	furnitureType: {
		low:
		{
			name: 'Zabudowa Niska',
			src: "noun_1377456_cc.png",
			chosen: false,
		},
		high:
		{
			name: 'Zabudowa Wysoka',
			src: "noun_451715_cc.png",
			chosen: false,
		},
		top:
		{
			name: 'Zabudowa Górna',
			src: "noun_160008_cc.png",
			chosen: false,
		},
	},
	addFeatures: function(newFeature,itsValue) {
		for (let i = 0; i < model.furnitureType.length; i++) {
			model.furnitureType[i][newFeature] = itsValue;
		}
	},
	getChosenType: function() {		
		for (let i = 0; i < model.furnitureType.length; i++) {
			if (model.furnitureType[i].chosen  === true ) {
				return model.furnitureType[i].name;
			}
		} 
		return false;
	},

}


const controller = {
	init : function() {
		model.init();
		view.init();
	},
	clearPage: function(parentEl) {
		for (key in parentEl.children) {
			if (parentEl.children.length !== 0) {
			parentEl.removeChild(parentEl.firstElementChild);
			}
		}
	},
	placeIcon: function(obj, parentEl, h, w) {		
		for (key in obj) {
		const iconsDiv =  document.createElement("DIV");
		  iconsDiv.className = key;
		  parentEl.appendChild(iconsDiv);
          const newFigure = document.createElement("FIGURE");
          const newImage = document.createElement("IMG");
          const newCaption = document.createElement("FIGCAPTION");
          newFigure.appendChild(newImage);
          newFigure.appendChild(newCaption);
          iconsDiv.appendChild(newFigure);
              
          newImage.height = h;
          newImage.width = w;
          newImage.src = obj[key].src;
          newCaption.textContent = obj[key].name;

           newFigure.addEventListener("click", (function(keyCopy) {
           	if (obj[key].chosen !== true) {
           		return function () {
		            obj[keyCopy].chosen = true;
		            
		            controller.placeInputFields(iconsDiv, keyCopy, "inputHeight");
		            controller.placeInputFields(iconsDiv, keyCopy, "inputWidth");
	        	}
        	};

            
            // view.render();
          }) (key) );
		}
	},
	placeButton: function(className, textContent, foo) {
		const button = document.createElement("BUTTON");
		view.main.appendChild(button);
		button.className = className;
    	button.textContent = textContent;   
    	button.addEventListener('click', (function(f) { return f })(foo) );
    },
    placeInputFields: function(parentEl, parentClassName, className) {
    	const newInputField = document.createElement('INPUT');
    	parentEl.appendChild(newInputField);
    	newInputField.className = className;
    	if (className === "inputHeight") {
    		// newInputField.value = "Wysokość:";
    		parentEl.addEventListener("change", 
    			console.log(parentClassName)
    		// model.furnitureType[parentClassName].height = newInputField.value
    			);
    	};
    	if (className === "inputWidth") {
    		newInputField.value = "Szerokość:";
    	}
    	


    },

}

const view = {
	main:  document.getElementsByClassName('main')[0],

	init: function() {
		this.renderPage.furnitureType();
	},
	renderPage: {
		furnitureType: function() {
			controller.placeIcon(model.furnitureType, view.main, 150, 100);
			// controller.placeButton("backButton", "Wróć");
			// controller.placeButton("nextButton", "Dalej", view.renderPage.dimensionsInput)
		},
		dimensionsInput: function() {
			controller.clearPage(view.main);
			controller.placeInputFields(view.main);

		},


	},

	

	renderSecondPage: function() {
		controller.clearPage(view.main);
	},

}

controller.init()
