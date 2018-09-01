let btn = __('signup_btn');

function generate_message() {
	let div = document.createElement('div');
	let p = document.createElement('p');

	div.appendChild(p);
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

			}else {
				console.log('are not empty');
			}
		}else {
			console.log('Success');
		}

	}, ajaxObject => console.log(ajaxObject.readyState));	
});