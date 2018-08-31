// This file includes all the general functions/objects in this app


// Get any dom objet by id
let __ = id => document.getElementById(id);

// Use Jquery Selector
let $ = id => document.querySelector(id); 

// Send data with ajax
function sendAjax(url, method, data, callback, waitCallback) {
	let request = XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsft.XMLHTTP');
	request.onreadystatechange = () => {
		if (request.readyState == 4 && request.status == 200) {
			callback(request.responseText);
		}else {
			waitCallback(request);
		}
	}
	request.open(method, url, true);
	request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	request.send(data);
}
