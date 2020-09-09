let serverURL = 'http://localhost:2393';
// let bttn = document.getElementsByClassName('btn_mp');
let vidURL = document.querySelector('.vid_name');   
let btn = document.getElementById('btn_mp')

// var i = Array(100);

btn.addEventListener('click', () => {
    if (btn.value == 'mp3') {
        redirectMp3(vidURL.href);
    } else if (btn.value == 'mp4') {
        redirectMp4(vidURL.href);
    }
});

// window.onload = function() {
//     for(var i=1; i < 100; i++ ) {
//         (function(m) {
//             document.getElementById("btn_mp" + m).addEventListener("click", function() {
//                 alert(m);
//             }, false);
//         })(i);
//     }
// }

// function sel_mp(){
//     if (bttn.value == 'mp3') {
//         redirectMp3(vidURL.href);
//     } else if (bttn.value == 'mp4') {
//         redirectMp4(vidURL.href);
//     }
// }

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