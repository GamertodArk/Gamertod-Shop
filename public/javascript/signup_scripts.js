let btn = __('signup_btn');

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

	let user_data = {
		name,
		email,
		pass1,
		pass2,
		country,
		username,
		last_name,
		b_day,
		b_month,
		b_year
	}


	let data = `data=${ JSON.stringify(user_data) }`;
	sendAjax('/users/signup', 'POST', data, response => console.log(response));
});