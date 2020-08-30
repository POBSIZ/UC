var newDiv = document.createElement('div');
newDiv.setAttribute('class', 'p_list');
newDiv.innerHTML = `<div class="p_name"> <a class="vid_name" href="{link_list[i]}" target="_blank"> <strong> {name_list[i]} </strong> </a> </div> <button class="bttn" value="mp3">MP3</button> <button class="bttn" value="mp4">MP4</button> <hr>`;
document.body.appendChild(newDiv);

let serverURL = 'http://localhost:2393';
let bttn = document.getElementsByClassName('bttn');
let vidURL = document.querySelector('.vid_name')

bttn[0].addEventListener('click', () => {
    if (bttn[0].value == 'mp3') {
        redirectMp3(vidURL.href);
    } else if (bttn[0].value == 'mp4') {
        redirectMp4(vidURL.href);
    }
});

bttn[1].addEventListener('click', () => {
    if (bttn[1].value == 'mp3') {
        redirectMp3(vidURL.href);
    } else if (bttn[1].value == 'mp4') {
        redirectMp4(vidURL.href);
    }
});

function WinClose(){
   window.open('','_self').close();     
}

function redirectMp3(query) {
    var newWindow = window.open("about:blank");
    newWindow.location.href = `${serverURL}/downloadmp3?url=${query}`;
    setTimeout(window.close(),3000);
}

function redirectMp4(query) {
    var newWindow = window.open("about:blank");
    newWindow.location.href = `${serverURL}/downloadmp4?url=${query}`;
    setTimeout(window.close(),3000);
}

