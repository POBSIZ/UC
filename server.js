const express = require('express');
const cors = require('cors');
const ytdl = require('ytdl-core');
const app = express();
const http = require('http');
const PORT = 2393;
var fs = require('fs');
const { dirname } = require('path');
const ytlist = require('youtube-playlist');
const { info } = require('console');
const { getInfo, validateID } = require('ytdl-core');
const { url } = require('inspector');
const { deepStrictEqual } = require('assert');
const { callbackify } = require('util');
const { get } = require('request');

app.use(cors());

// html/css/js get 
app.get('/', async(req, res, next)=>{1
	res.sendFile(__dirname + '/index.html');
});

app.get ( '/script.js', (req, res, next) => {
	res.sendFile (__dirname + '/script.js');
});

app.get ( '/style.css', (req, res, next) => {
	res.sendFile (__dirname + '/style.css');
});

app.get ( '/playlist.html', (req, res, next) => {
	res.sendFile (__dirname + '/playlist.html');
});

// Youtube download function
app.get('/downloadmp3', async (req, res, next) => {
	try {
		
		function getTitleAudio (videoUrl){
			return new Promise ((resolve, reject) => {
				ytdl.getBasicInfo (videoUrl, {format: 'mp4'},(err, info) => {
				if (err) throw err;
					a_title = info.videoDetails.title.replace(/[^\x00-\x7F]/g, "");
				resolve (info.title)
				console.log(info.title)
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

		var a_title = '';
		var list_url = req.query.url
		var isit_playlist = list_url.indexOf('playlist')
		var link_list = new Array();
		
		if (isit_playlist != -1){
			ytlist(list_url, 'url').then(res => {
				link_list = res.data.playlist;
				for(i = 0; i<link_list.length; i++){
					getTitleAudio(link_list[i]).then(console.log(link_list[i]))
				}
			});
		}
		else{
			getTitleAudio(list_url).then(downloadAUDIO)
		}

	} catch (err) {
		console.error(err);
	}
});

app.get('/downloadmp4', async (req, res, next) => {
	try {
		
		function getTitleVideo (videoUrl){
			return new Promise ((resolve, reject) => {
				ytdl.getBasicInfo (videoUrl, {format: 'mp4'},(err, info) => {
				if (err) throw err;
					a_title = info.videoDetails.title.replace(/[^\x00-\x7F]/g, "");
				resolve (info.title)
				console.log(info.title)
				})
			})
			} 
		
		function downloadVIDEO(){			
			res.header('Content-Disposition', `attachment; filename="${a_title}.mp4"`);
			ytdl(list_url, {
				format: 'mp4',
				quality: 'highestvideo',
			}).pipe(res);
		}

		var a_title = '';
		var list_url = req.query.url
		var isit_playlist = list_url.indexOf('playlist')
		var link_list = new Array();
		
		if (isit_playlist != -1){
			ytlist(list_url, 'url').then(res => {
				link_list = res.data.playlist;
				for(i = 0; i<link_list.length; i++){
					getTitleVideo(link_list[i]).then(console.log(link_list[i]))
				}
			});
		}
		else{
			getTitleVideo(list_url).then(downloadVIDEO)
		}

	} catch (err) {
		console.error(err);
	}
});



app.listen(PORT, () => {
	console.log(`Server Works !!! At port ${PORT}`);
});