const csrftoken = getCookie('csrftoken');

document.querySelector('#create').addEventListener('click', function() {
	window.location.href = "http://127.0.0.1:8000/forgot/";
});

document.querySelector('#register').addEventListener('click', function() {
	window.location.href = "http://127.0.0.1:8000/register/";
});


document.getElementById('myForm').addEventListener('submit', function(event) {
	event.preventDefault();
	let myForm = document.querySelector('#myForm')
	let formData = new FormData(myForm)
	return fetch('/login/request', {
		method: 'post',
		headers: {"X-CSRFToken": csrftoken},
		body: JSON.stringify(Object.fromEntries(formData.entries()))
	}).then(function(res) {
		return res.json();
	}).then(function(res) {
		detail = res["details"];
		if (detail == "no_user") {
			alert_message.innerHTML = "Email Not Found."
			alert_container.style.borderColor = 'red'
			alert_message.style.borderColor = 'red'
			alert_container.style.display = 'block'
		}
		if (detail == "pass_failed") {
			alert_message.innerHTML = "Incorrect Password."
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
});

document.querySelector('#checkBox').addEventListener('click', function() {
	let x = document.querySelector('#password');
	if (x.type == "password") {
		x.type = "text";
	} else {
		x.type = "password";
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