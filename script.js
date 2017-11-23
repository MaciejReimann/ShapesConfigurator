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
		for (key in this.furnitureType) {
			this.furnitureType[key][newFeature] = itsValue;
		}
	},
	getChosenType: function() {		
		for (key in this.furnitureType) {
			if (this.furnitureType[key].chosen  === true ) {
				return model.furnitureType[key].name;
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
          		return function () {
		           	if (obj[keyCopy].chosen === false) {
					    obj[keyCopy].chosen = true;
					    controller.placeInputFields(iconsDiv, keyCopy, "inputHeight");
					    controller.placeInputFields(iconsDiv, keyCopy, "inputWidth");
			        	}
		        	};
		        
	        }) (key) );
		}
	},
	
    placeInputFields: function(parentEl, parentClassName, className) {
    	const newInputField = document.createElement('INPUT');
    	parentEl.appendChild(newInputField);
    	newInputField.className = className;
    	
    	if (className === "inputHeight") {
    		newInputField.value = "Wysokość:";
    		newInputField.focus();
    		parentEl.addEventListener("change", function() {
    			model.furnitureType[parentClassName].height = newInputField.value
    		});
    	};
    	if (className === "inputWidth") {
    		newInputField.value = "Szerokość:";
    		parentEl.addEventListener("change", function() {
    			model.furnitureType[parentClassName].height = newInputField.value
    		});
    	};
    	newInputField.addEventListener("keyup", function(event) {
    		if (event.keyCode === 13 && newInputField.nextElementSibling === null) {
        		view.renderPage.placeBackNextButtons("backButton", "Wróć", (function (f) {
        			return f
        		}) (view.renderPage.first ) ) // IT WOULD BE GOOD TO CHANGE IT FOR ;PREVIOUS
        		view.renderPage.placeBackNextButtons("nextButton", "Dalej", (function (f) {
        			return f
        		}) (view.renderPage.third ) ) //AND THIS FOR NEXT
    		};
    		if (event.keyCode === 13) {
        		newInputField.nextElementSibling.focus()
        	};
        	
		});
    	
    },
    showFinishes: function() {

    }

}

const view = {
	main:  document.getElementsByClassName('main')[0],

	init: function() {
		controller.clearPage(view.main);
		this.renderPage.furnitureType();
	},
	// A GENERAL VIEW FUNCTION FOR JUMBING BACK AND FORTH PAGES -> CREATES AN ARRAY OUT OF RENDERPAGE. FUNCTIONS 
	// AND THEN ITERATES THROUGN IT RETURNNING NEXT OR PREVIOUS ARRAY ELEMENTS [PAGES]
	renderPage: {
		first: function() {
			view.renderPage.furnitureType();
		},
		second: function() {
			view.renderPage.first()
			view.renderPage.dimensionsInput();
		},
		third: function() {
			view.renderPage.second()
			view.renderPage.finishings()
		},
		placeBackNextButtons: function(className, textContent, foo) {
			const button = document.createElement("BUTTON");
			view.main.appendChild(button);
			button.className = className;
	    	button.textContent = textContent;
	    	button.focus();
	    	button.addEventListener('click', (function(f) { return f })(foo) );
    	},
		furnitureType: function() {
			controller.placeIcon(model.furnitureType, view.main, 150, 100);
			// controller.placeButton("backButton", "Wróć");
			// controller.placeButton("nextButton", "Dalej", funct)
		},
		dimensionsInput: function() {
			controller.clearPage(view.main);
			controller.placeInputFields(view.main);
		},
		finishings: function() {
			controller.clearPage(view.main);
			controller.showFinishes(view.main);
		}
	},

	

	renderSecondPage: function() {
		controller.clearPage(view.main);
	},

}

controller.init()
