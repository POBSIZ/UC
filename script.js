let Btn = document.getElementById('btn');
let URLinput = document.querySelector('.URL-input');
let select = document.querySelector('.opt');
let serverURL = 'http://localhost:2393';

var plist = document.getElementById('playlist');

Btn.addEventListener('click', () => {
	if (!URLinput.value) {
		alert('Enter YouTube URL');
	} else {
		if (select.value == 'mp3') {
			redirectMp3(URLinput.value);
			setTimeout(() => {
				plist.style.display = 'block'
			}, 3000);
		} else if (select.value == 'mp4') {
			redirectMp4(URLinput.value);
			setTimeout(() => {
				plist.style.display = 'block'
			}, 5000);
		}
	}
});


function redirectMp3(query) {
	var newWindow = window.open("about:blank");
	newWindow.location.href = `${serverURL}/downloadmp3?url=${query}`;
}

function redirectMp4(query) {
	var newWindow = window.open("about:blank");
	newWindow.location.href = `${serverURL}/downloadmp4?url=${query}`;
}

