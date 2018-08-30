// This file includes all the general functions/objects in this app


// Get any dom objet by id
let __ = id => document.getElementById(id);

// Send data with ajax
function sendAjax(url, method, data, callback) {
	let request = XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsft.XMLHTTP');
	request.onreadystatechange = () => {
		if (request.readyState == 4 && request.status == 200) {
			// console.log(request.responseText);
			callback(request.responseText);
		}
	}
	request.open(method, url, true);
	request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	request.send(data);
}
