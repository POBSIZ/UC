const express = require('express');
const cors = require('cors');
const ytlist = require('youtube-playlist');
const ytdl = require('ytdl-core');
const app = express();
const ejs = require('ejs');
// const fs = require('fs');
// const http = require('http');


app.use(cors());

// html/css/js get 
app.set('view engine', 'ejs');
app.set('views', './views')

app.get('/', async(req, res, next)=>{
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
var title_L = new Array();

// window.location.href = '/views/temp.ejs';

app.get('/views/temp.ejs', (req, res, next)=>{
	res.render(__dirname + '/views/temp', {
		link_list: link_list,
		title_L: title_L, 
	});
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
				});
			});
		} 
		
		function downloadAUDIO(){			
			res.header('Content-Disposition', `attachment; filename="${a_title}mp3"`);
			ytdl(list_url, {
				format: 'mp3',
				filter: 'audioonly',
				quality: 'highest',
			}).pipe(res);
		}

		var a_title = 'a_title';
		var list_url = req.query.url
		var isit_playlist = list_url.indexOf('playlist')

		if (isit_playlist != -1){
			if(link_list.length && title_L.length > 0){
				link_list = new Array();
				title_L = new Array();
			}

			ytlist(list_url, 'url').then(res => {
				link_list = res.data.playlist;

				link_list = link_list;
				title_L = title_L;
			}).then(
				ytlist(list_url, 'name').then(res =>{
					title_L = res.data.playlist
					title_L = title_L
				})
			).then(	res => {
					ejs.renderFile(__dirname + '/views/temp.ejs', {
						link_list: link_list,
						title_L: title_L,
					}, {}, function(err, str){if (err) console.log(err)}
			)
			});//.then(window.location.href.reload());
		}
		else{
			getTitleAudio(list_url).then(downloadAUDIO).then(console.log(a_title))	
		}
		
	} catch (err) {
		console.error(err);
	}
});

app.get('/downloadmp4', async (req, res, next) => {
	try {
		function getTitleAudio (videoUrl){
			return new Promise ((resolve, reject) => {
				ytdl.getBasicInfo (videoUrl, {format: 'mp4'},(err, info) => {
				if (err) throw err;
					a_title = info.videoDetails.title.replace(/[^\x00-\x7F]/g, "");
					console.log(info.title)
				resolve (info.title)
				});
			});
		} 
		
		function downloadAUDIO(){			
			res.header('Content-Disposition', `attachment; filename="${a_title}"`);
			ytdl(list_url, {
				format: 'mp4',
				quality: 'highest',
			}).pipe(res);
		}

		var a_title = 'a_title';
		var list_url = req.query.url
		var isit_playlist = list_url.indexOf('playlist')

		if (isit_playlist != -1){
			if(link_list.length && title_L.length > 0){
				link_list = new Array();
				title_L = new Array();
			}

			ytlist(list_url, 'url').then(res => {
				link_list = res.data.playlist;

				link_list = link_list;
				title_L = title_L;
			}).then(
				ytlist(list_url, 'name').then(res =>{
					title_L = res.data.playlist
					title_L = title_L
				})
			).then(	res => {
					ejs.renderFile(__dirname + '/views/temp.ejs', {
						link_list: link_list,
						title_L: title_L,
					}, {}, function(err, str){if (err) console.log(err)}
			)
			});//.then(window.location.href.reload());
		}
		else{
			getTitleAudio(list_url).then(downloadAUDIO).then(console.log(a_title))	
		}
		
	} catch (err) {
		console.error(err);
	}
});


var PORT = 2393;
app.listen(process.env.PORT || 2393, () => {
	console.log(`Server Works !!! At port`+PORT);
});
