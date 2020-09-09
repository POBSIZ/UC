const express = require('express');
const cors = require('cors');
const ytlist = require('youtube-playlist');
const ytdl = require('ytdl-core');
const app = express();
const ejs = require('ejs');
const fs = require('fs');
const http = require('http');
const PORT = 2393;

app.use(cors());

// html/css/js get 
app.set('view engine', 'ejs');
app.set('views', './views')

app.get('/', async(req, res, next)=>{1
	res.sendFile(__dirname + '/index.html');
});

app.get('/script.js', (req, res, next) => {
	res.sendFile(__dirname + '/script.js');
});

app.get('/style.css', (req, res, next) => {
	res.sendFile(__dirname + '/style.css');
});

app.get('/playlist.html', (req, res, next) => {
	res.sendFile(__dirname + '/playlist.html');
});

app.get('/p_list.js', (req, res, next) =>{
	res.sendFile(__dirname + '/p_list.js');
})

var link_list = new Array();

app.get('/views/temp.ejs', (req, res, next)=>{
	res.render(__dirname + '/views/temp', {link_list: link_list});
});



// Youtube download function
app.get('/downloadmp3', async (req, res, next) => {
	try {

		function getTitleAudio (videoUrl){
			return new Promise ((resolve, reject) => {
				ytdl.getBasicInfo (videoUrl, {format: 'mp4'},(err, info) => {
				if (err) throw err;
					a_title = info.videoDetails.title.replace(/[^\x00-\x7F]/g, "");
					console.log(info.title)
				resolve (info.title)
				})
			})
			} 
		
		function downloadAUDIO(){			
			res.header('Content-Disposition', `attachment; filename="${a_title}.mp3"`);
			ytdl(list_url, {
				format: 'mp3',
				filter: 'audioonly',
				quality: 'highestaudio',
			}).pipe(res);
		}

		var a_title = 'a_title';
		var list_url = req.query.url
		var isit_playlist = list_url.indexOf('playlist')
		// var link_list = new Array();

		if (isit_playlist != -1){
			var setLT = ytlist(list_url, 'url').then(res => {
				link_list = res.data.playlist;
				console.log(link_list)
				for(i = 0; i<link_list.length; i++){
					getTitleAudio(link_list[i])
				}
			}).then(res => {
				ejs.renderFile(__dirname + '/views/temp.ejs', {link_list: link_list}, {}, function(err, str){if (err) console.log(err)});
			})
		}
		else{
			getTitleAudio(list_url).then(downloadAUDIO).then(console.log(a_title))	
		}
		
	} catch (err) {
		console.error(err);
	}
});

app.listen(PORT, () => {
	console.log(`Server Works !!! At port ${PORT}`);
});