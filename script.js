let Btn = document.getElementById('btn');
let URLinput = document.querySelector('.URL-input');
let select = document.querySelector('.opt');
let serverURL = 'https://utube-convert.herokuapp.com';

var plist = document.getElementById('playlist');
// var iiPL = URLinput.value.indexOf('playlist');

Btn.addEventListener('click', () => {
	if (!URLinput.value) {
		alert('Enter YouTube URL');
	} else {
		setBlock(1);
		if (select.value == 'mp3'){
			redirectMp3(URLinput.value);
		}else if (select.value == 'mp4'){
			redirectMp4(URLinput.value);
		}
	}
});

function setBlock(time){
	setTimeout(() => {
		plist.setAttribute('style', 'display: block;');
	}, time * 1000);
}

function redirectMp3(query) {
	var newWindow = window.open("about:blank");
	newWindow.location.href = serverURL+`/downloadmp3?url=`+query;
}

function redirectMp4(query) {
	var newWindow = window.open("about:blank");
	newWindow.location.href = serverURL+`/downloadmp4?url=`+query`;
}