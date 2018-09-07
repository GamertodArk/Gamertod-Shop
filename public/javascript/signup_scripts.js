let btn = __('signup_btn');

function generate_message(parent, message, className, childNodes = 0) {
	// If there's a message already showing, we delete it
	__('message_g_javascript') ? __('message_g_javascript').parentNode.removeChild(__('message_g_javascript')) : null;


	let div = document.createElement('div');
	let p = document.createElement('p');
	let close = document.createElement('p');
	let msg = document.createTextNode(message);

	p.appendChild(msg);

	div.classList.add('msg_wrap');
	div.classList.add(className);
	div.setAttribute('id','message_g_javascript');

	close.setAttribute('id', 'close');
	close.setAttribute('onclick', 'this.parentNode.parentNode.removeChild(this.parentNode)');

	div.appendChild(p);
	div.appendChild(close);

	parent.insertBefore(div, parent.childNodes[childNodes]);
}

btn.addEventListener('click', (event) => {
	event.preventDefault();

	// Elements
	let name = __('name').value;
	let email = __('email').value;
	let b_day = __('b_day').value;
	let gender = __('gender').value;
	let b_year = __('b_year').value;
	let pass1 = __('password').value;
	let pass2 = __('password2').value;
	let country = __('country').value;
	let b_month = __('b_month').value;
	let username = __('username').value;
	let last_name = __('last_name').value;


	// Remove the error class from the labels
	let labels = document.getElementsByTagName('label');
	for (var i = 0; i < labels.length; i++) {
		labels[i].classList.remove('label-error');
	}

	// Remove the custom error messages
	let cust_err_msg = document.getElementsByTagName('span');
	for (var i = 0; i < cust_err_msg.length; i++) {
		cust_err_msg[i].innerHTML = '';
	}
	
	// Set all the values of the form in a query que send it to the server with ajax
	let params = `name=${name}&last_name=${last_name}&email=${email}&username=${username}&country=${country}&gender=${gender}&password=${pass1}&password2=${pass2}&b_day=${b_day}&b_month=${b_month}&b_year=${b_year}`;
	sendAjax('/users/signup', 'POST', params, res => {
		let data = JSON.parse(res);

		if (data.error) {
			if (data.isEmpty) {

				// Add the label error class
				for (var i = 0; i < data.errors.length; i++) {
					$(`label[for="${data.errors[i].param}"]`).classList.add('label-error');
				}

				// Show the error message
				generate_message(__('signup_form'), 'Fill the empty data', 'msg_error', 1);

			}else {

				// We loop through all erros messages and parameters to show them up
				for (var i = 0; i < data.errors.length; i++) {
					__(`${data.errors[i].param}_span`).innerHTML = data.errors[i].msg;
				}

			}
		}else {
			console.log('Success');
			window.location = '/users/login';
		}

	}, ajaxObject => console.log(ajaxObject.readyState));	
});