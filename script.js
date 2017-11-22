
const model = {
	init: function() {
	},

	furnitureType: [
		{
			name: 'Zabudowa Niska',
			src: "noun_1377456_cc.png",
			chosen: false,
		},
		{
			name: 'Zabudowa Wysoka',
			src: "noun_451715_cc.png",
			chosen: false,
		},
		{
			name: 'Zabudowa Górna',
			src: "noun_160008_cc.png",
			chosen: false,
		},
	],
	getChosenType: function() {		for (let i = 0; i < model.furnitureType.length; i++) {
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
	placeIcon: function(array, parentEl, h, w) {
		
		for (let i = 0; i < array.length; i++) {
		const iconsDiv =  document.createElement("DIV");
		  iconsDiv.className = "icon"+(i+1)
		  parentEl.appendChild(iconsDiv);
          const newFigure = document.createElement("FIGURE");
          const newImage = document.createElement("IMG");
          const newCaption = document.createElement("FIGCAPTION");
          newFigure.appendChild(newImage);
          newFigure.appendChild(newCaption);
          iconsDiv.appendChild(newFigure);
              
          newImage.height = h;
          newImage.width = w;
          newImage.src = array[i].src;
          newCaption.textContent = array[i].name;

           newFigure.addEventListener("click", function() {
            model.furnitureType[i].chosen = true;
            console.log(model.getChosenType())
            controller.placeInputFields(iconsDiv, "inputHeight")
            controller.placeInputFields(iconsDiv, "inputWidth")

            
            // view.render();
          });
		}
	},
	placeButton: function(className, textContent, foo) {
		const button = document.createElement("BUTTON");
		view.main.appendChild(button);
		button.className = className;
    	button.textContent = textContent;   
    	button.addEventListener('click', (function(f) { return f })(foo) );
    },
    placeInputFields: function(parentEl, className) {
    	const newInputField = document.createElement('INPUT');
    	parentEl.appendChild(newInputField);
    	newInputField.className = className;
    	if (className === "inputHeight") {
    		newInputField.value = "Wysokość";
    	};
    	if (className === "inputWidth") {
    		newInputField.value = "Szerokość";
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
			controller.placeIcon(model.furnitureType, view.main, 200, 150);
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
