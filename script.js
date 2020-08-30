let Btn = document.getElementById('btn');
let URLinput = document.querySelector('.URL-input');
let select = document.querySelector('.opt');
let serverURL = 'http://localhost:2393';

Btn.addEventListener('click', () => {
	if (!URLinput.value) {
		alert('Enter YouTube URL');
	} else {
		if (select.value == 'mp3') {
			redirectMp3(URLinput.value);
		} else if (select.value == 'mp4') {
			redirectMp4(URLinput.value);
		}
	}
});


function redirectMp3(query) {
	// var newWindow = window.open("about:blank");
	window.location.href = `${serverURL}/downloadmp3?url=${query}`;
}

function redirectMp4(query) {
	// var newWindow = window.open("about:blank");
	window.location.href = `${serverURL}/downloadmp4?url=${query}`;
}

