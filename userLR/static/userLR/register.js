const csrftoken = getCookie('csrftoken');

document.querySelector('#create').addEventListener('click', function() {
	window.location.href = "http://127.0.0.1:8000/login/";
});

document.querySelector('#myForm').addEventListener('submit', function(event) {
	let pass = document.querySelector('#password');
	let re_pass = document.querySelector('#re_password');
	let alert_container = document.querySelector('#alert_container');
	let alert_message = document.querySelector('#alert_message');
	let detail = undefined;
	event.preventDefault();
	if (re_pass.value != pass.value) {
		alert_message.innerHTML = "Passwords Must Match."
		alert_container.style.borderColor = 'red'
		alert_message.style.borderColor = 'red'
		alert_container.style.display = 'block'
	}  else {
		alert_container.style.display = 'none'
		let myForm = document.querySelector('#myForm')
		let formData = new FormData(myForm)
		return fetch('/register/request', {
			method: 'post',
			headers: {"X-CSRFToken": csrftoken},
			body: JSON.stringify(Object.fromEntries(formData.entries()))
		}).then(function(res) {
			return res.json();
		}).then(function(res) {
			detail = res["details"];
			if (detail == "in_use") {
				alert_message.innerHTML = "Email is already registered."
				alert_container.style.borderColor = 'red'
				alert_message.style.borderColor = 'red'
				alert_container.style.display = 'block'
			}
			if (detail == "pass_failed") {
				alert_message.innerHTML = "Passwords Must Match."
				alert_container.style.borderColor = 'red'
				alert_message.style.borderColor = 'red'
				alert_container.style.display = 'block'
			}
			if (detail == "accepted") {
				alert_message.innerHTML = "Logged In Succesfully"
				alert_container.style.borderColor = 'green'
				alert_message.style.color = 'green'
				alert_container.style.display = 'block'
				window.location.href = "http://127.0.0.1:8000/portal/";
			}
		})
	}
});

document.querySelector('#checkBox').addEventListener('click', function() {
	let x = document.querySelectorAll('.password');
	if (x[0].type == "password") {
		x[0].type = "text";
		x[1].type = "text";
	} else {
		x[0].type = "password";
		x[1].type = "password";
	}
});



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