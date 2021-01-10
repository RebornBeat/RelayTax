const csrftoken = getCookie('csrftoken');
const yN_Buttons = document.querySelectorAll('.Y_N_Buttons');
var aButtons = document.querySelectorAll('.add_button');
var rButtons = document.querySelectorAll('.remove_button');

function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

function addFor () {
	for ( let i = 0; i < aButtons.length; i++) {
		aButtons[i].addEventListener('click', function() {
			addF (this)
		rButtons = document.querySelectorAll('.remove_button');
		removeFor ()
		});
	}
}

function addF (thisF) {
	let cNodes = thisF.parentNode.childNodes;
	let rNode = undefined
	let nButton = document.createElement("SPAN");
	let cQuestion = thisF.parentNode.previousElementSibling.cloneNode(true)

	for ( let ii = 0; ii < cNodes.length; ii++) {
		if (cNodes[ii].nodeType == 1) {
			if (cNodes[ii].classList.contains('remove_button') == true) {
				rNode = true
			}
		}
	}

	// if rNodes is false add remove button
	if (rNode == undefined) {
		nButton.className = 'remove_button';
		nButton.innerHTML = 'Remove';
		thisF.parentNode.appendChild(nButton);
	}

	thisF.style.right = '';
	thisF.style.left = '0';
	if ( thisF.parentNode.classList.contains('virtual_currency') == true ) {
		thisF.style.textAlign="left";
		thisF.style.left = '-10%';
	}
	if ( thisF.parentNode.classList.contains('medical_dental') == true ) {
		thisF.style.textAlign="left";
		thisF.style.left = '-10%';
	}
	let cThis = thisF.parentNode.cloneNode(true);
	thisF.innerHTML = '';
	cQuestion.style.marginTop = '4%';
	thisF.parentNode.parentNode.insertBefore(cQuestion, thisF.parentNode.nextElementSibling);
	thisF.parentNode.parentNode.insertBefore(cThis, thisF.parentNode.nextElementSibling.nextElementSibling);
	thisF.parentNode.removeChild(thisF)
	aButtons = document.querySelectorAll('.add_button');
	addFor ()
}

function removeFor () {
	for ( let i = 0; i < rButtons.length; i++) {
		rButtons[i].addEventListener('click', function() {
			let tPClass = this.parentNode.getAttribute('class');
			let nButton = document.createElement("SPAN");
			let pPNodes = this.parentNode.parentNode.getElementsByClassName(`${tPClass}`);
			console.log(pPNodes.length)
			nButton.className = 'add_button';
			nButton.innerHTML = 'New Asset';
			if ( this.parentNode.classList.contains('virtual_currency') == true ) {
				nButton.innerHTML = 'New Currency';
				nButton.classList.add('currency_add');
			}
			if ( this.parentNode.classList.contains('medical_dental') == true ) {
				nButton.innerHTML = 'New Expense';
				nButton.classList.add('currency_add');
			}
			if ( pPNodes.length == 2) {
				for ( let ii = 0; ii < pPNodes.length; ii++) {
					if ( pPNodes[ii] != this.parentNode) {
						pPNodes[ii].removeChild(pPNodes[ii].querySelector('.remove_button'))
						if ( pPNodes[ii].querySelector('.add_button') == null ) {
							nButton.style.right = '0';
							nButton.style.left = '';
							nButton.style.textAlign="right";
							pPNodes[ii].appendChild(nButton);
						} else {
							pPNodes[ii].querySelector('.add_button').style.right = '0';
							pPNodes[ii].querySelector('.add_button').style.left = '';
							pPNodes[ii].querySelector('.add_button').style.textAlign="right";
						}
					}
				}
			} else {
				if ( this.parentNode.querySelector('.add_button') != null) {
					nButton.style.right = '';
					nButton.style.left = '0';
					if ( this.parentNode.classList.contains('virtual_currency') == true ) {
						nButton.style.textAlign="left";
						nButton.style.left="-10%";
					}
					if ( this.parentNode.classList.contains('medical_dental') == true ) {
						nButton.style.textAlign="left";
						nButton.style.left="-10%";
					}
					pPNodes[pPNodes.length - 2].appendChild(nButton);
				}
			}
			this.parentNode.parentNode.removeChild(this.parentNode.previousElementSibling)
			this.parentNode.parentNode.removeChild(this.parentNode)
			aButtons = document.querySelectorAll('.add_button');
			addFor ()
		});
	}
}

for ( let i = 0; i < 3; i++) {
	document.querySelectorAll('.form_wrapper')[i].addEventListener('click', function() {
		let current_wrapper = this.getAttribute('id')
		
		if (current_wrapper == "question_container" ) {
			
			if ( document.querySelector('#questions_import') != null || document.querySelector('#required_imports').classList.contains('step_1_completed') == true ) {
				
			} else {
				document.querySelector('#display_question').style.display = 'block'
			}
		
		}
		
		if (current_wrapper == "personal_container" ) {
			
			if ( document.querySelector('#personal_import') != null || document.querySelector('#required_imports').classList.contains('step_2_completed') == true ) {
				
			} else{
				document.querySelector('#display_personal').style.display = 'block'
			}
			
		}
		
		if (current_wrapper == "upload_container" ) {
			
			if ( document.querySelector('#upload_import') != null || document.querySelector('#required_imports').classList.contains('step_3_completed') == true ) {
				
			} else{
				document.querySelector('#display_upload').style.display = 'block'
			}
			
		}
		
	});
}

for ( let i = 0; i < 3; i++) {
	document.querySelectorAll('#exit')[i].addEventListener('click', function() {
		this.parentElement.style.display = 'none'
	});
}

for ( let i = 0; i < yN_Buttons.length; i++) {
	yN_Buttons[i].addEventListener('click', function() {
		let buttonParent = this.parentElement
		let activeButton = buttonParent.querySelector('.active');
		
		// If active button found clear color style and active class
		if ( activeButton ) {
			activeButton.style.color = 'black'
			activeButton.style.backgroundColor = 'white'
			activeButton.classList.remove('active');
		}
		
		this.style.color = 'white'
		this.style.backgroundColor = '#0f87de'
		this.classList.add('active');
		
		if (buttonParent.parentElement.classList.contains('active') == false) {
			buttonParent.parentElement.classList.add('active');
		}
		
		if (buttonParent.parentElement.classList.contains('extra_fields') == true) {
			let buttonPPID = buttonParent.parentElement.getAttribute('id');
			let buttonPPClass = document.querySelectorAll(`.${buttonPPID}`);
			
			if (this.innerHTML == 'Yes' ) {
				for ( let ii = 0; ii < buttonPPClass.length; ii++) {
					buttonPPClass[ii].style.display = 'flex'
					
					if ( buttonPPClass[ii].classList.contains('question_wrapper') == false ) {
						buttonPPClass[ii].classList.add('active');
					} else {
						buttonPPClass[ii].classList.add('required');
					}
					
				}
			} else {
				for ( let ii = 0; ii < buttonPPClass.length; ii++) {
					buttonPPClass[ii].style.display = 'none'
					
					if ( buttonPPClass[ii].classList.contains('question_wrapper') == false ) {
						buttonPPClass[ii].classList.remove('active');
					} else {
						buttonPPClass[ii].classList.remove('required');
					}
					
				}
			}
		}
	});
}

if ( document.querySelector('#dependants_import_value') != null ) {
	let dependantsValue = parseInt( document.querySelector('#dependants_import_value').innerHTML )
	let dependentWrapper = document.querySelectorAll('.dependant_wrapper');

	for ( let i = 0; i < dependantsValue; i++ ) {
		
		if ( i != 0 ) {
			let dependentDiv = dependentWrapper[0].cloneNode(true);
			dependentWrapper[0].parentNode.insertBefore(dependentDiv, dependentWrapper[dependentWrapper.length - 1].nextElementSibling)
			dependentWrapper = document.querySelectorAll('.dependant_wrapper');
			dependentWrapper[dependentWrapper.length - 1].querySelector('.user_Fname').innerHTML = `Dependant ${i + 1}`
		} else {
			document.querySelector('.abmit_wrapper').style.position = 'relative';
			document.querySelector('.abmit_wrapper').style.bottom = '';
			document.querySelector('.abmit_wrapper').style.marginTop = '2%';
		}
		
	}
	
	dependentWrapper = document.querySelectorAll('.dependant_wrapper');
	
	for ( let i = 0; i < dependentWrapper.length; i++ ) {
		dependentWrapper[i].style.display = 'block';
	}
}

document.querySelector('#question_submit').addEventListener('click', function() {
	let allDict = {};
	let allQuestions = document.querySelectorAll('.question_wrapper');
	let allInputs = document.getElementsByTagName("INPUT");
	
	function getResponse (x) {
		let questionID = x.getAttribute('id');
		let questionResponse = x.querySelector('.active').innerHTML
		// Store Question responce under its pertaining ID in allDict
		allDict[questionID] = {};
		allDict[questionID]['Response'] = questionResponse
		
		if ( questionResponse == 'Yes' ) {
			allDict[questionID]['Entries'] = []
		}
		
	}
	
	// Check if all required questions are answered
	for ( let ii = 0; ii < allQuestions.length; ii++) {
		if ( allQuestions[ii].classList.contains('dormant') == false ) {  
			if ( allQuestions[ii].classList.contains('active') == false ) { 
				alert("Please Answer All Questions");
				return 
			} else {
				getResponse (allQuestions[ii])
			}	
		} else {
			if ( allQuestions[ii].classList.contains('required') == true ) {
				if ( allQuestions[ii].classList.contains('active') == false ) {
					alert("Please Answer All Questions");
					return 
				} else {
					getResponse (allQuestions[ii])
				}
			}
		}
	}
	
	// Check if all active inputs are not blank
	for ( let ii = 0; ii < allInputs.length; ii++) {
		if ( allInputs[ii].parentElement.classList.contains('active') == true ) {
			if ( allInputs[ii].value  == '' ) {
				alert("Please Complete All Fields");
				return
			}
		}
	}
	
	// Store inputs and selections for all questions with a responce of yes
	for ( let question in allDict) {
		
		if ( allDict[question]['Response'] == 'Yes' ) {
			let questionClasses = document.querySelectorAll(`.${question}`);
			
			for ( let ii = 0; ii < questionClasses.length; ii++ ) {
				let questionInput = questionClasses[ii].getElementsByTagName("INPUT");
				let questionSelect = questionClasses[ii].getElementsByTagName("SELECT");
				let entries = []
				
				if ( questionInput.length != 0 ) {
					for ( let iii = 0; iii < questionInput.length; iii++ ) {
						entries.push( questionInput[iii].value )
					}
				}
				
				if ( questionSelect.length != 0 ) {
					for ( let iii = 0; iii < questionSelect.length; iii++ ) {
						entries.push( questionSelect[iii].value )
					}
				}
				
				if ( entries.length != 0 ) {
				allDict[question]['Entries'].push( entries )
				}
				
			}
			
		}
		
	}
	
	// Send dict to server through POST & FETCH
	fetch('/portal/question', {
		method: 'post',
		headers: {"X-CSRFToken": csrftoken},
		body: JSON.stringify(allDict)
	})
	
	document.querySelector('#step_1').querySelector('.status').innerHTML = ('(Completed)')
	document.querySelector('#step_1').querySelector('.status').style.color = 'green'
	document.querySelector('#required_imports').classList.add('step_1_completed');
	// Change display to completed
	alert("Submitted");
});

document.querySelector('#personal_submit').addEventListener('click', function() {
	let allDict = {};
	let personWrapper = document.querySelectorAll('.person_wrapper');
	let checkResults = true;

	// Get all values from all inputs and selection
	for ( let i = 0; i < personWrapper.length; i++ ) {

		if ( checkResults == false ) {
				return
			}
			
		let key = personWrapper[i].querySelector('.user_Fname').innerHTML;
		let allInputs = personWrapper[i].getElementsByTagName("INPUT");
		let allQuestions = personWrapper[i].querySelectorAll('.question_wrapper');
		allDict[key] = {};
		
		for ( let ii = 0; ii < allQuestions.length; ii++) {			
			allDict[key][allQuestions[ii].getAttribute('id')] = allQuestions[ii].value
		}
		
		for ( let ii = 0; ii < allInputs.length; ii++) {			
			if ( allInputs[ii].value  == '' ) {
				checkResults = false;
				alert("Please Complete All Fields");
				return
			} else {
				allDict[key][allInputs[ii].getAttribute('id')] = allInputs[ii].value
			}
		}
		
	}
	
	// Send dict to server through POST & FETCH
	if ( checkResults == true ) {
		fetch('/portal/personal', {
			method: 'post',
			headers: {"X-CSRFToken": csrftoken},
			body: JSON.stringify(allDict)
		})
		document.querySelector('#step_2').querySelector('.status').innerHTML = ('(Completed)')
		document.querySelector('#step_2').querySelector('.status').style.color = 'green'
		document.querySelector('#required_imports').classList.add('step_2_completed');
		document.querySelector('#display_personal').style.display = 'none';
		// Change display to completed
	}
	
});

document.querySelector('#upload_submit').addEventListener('click', function() {
	let myFile = this.parentElement.parentElement.querySelector('.upload_file');
	
	if ( myFile.value != '' ) {
		fetch('/portal/upload', {
				method: 'post',
				headers: { "X-CSRFToken": csrftoken},
				body: myFile.files[0]
			})
	document.querySelector('#step_3').querySelector('.status').innerHTML = ('(Completed)')
	document.querySelector('#step_3').querySelector('.status').style.color = 'green'
	document.querySelector('#required_imports').classList.add('step_3_completed');
	document.querySelector('#display_upload').style.display = 'none';
	}
	
});

addFor ()
