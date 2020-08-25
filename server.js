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

// Youtube download function
app.get('/downloadmp3', async (req, res, next) => {
	try {
		function AUDIOfunction(a_url){

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
				ytdl(a_url, {
					format: 'mp3',
					filter: 'audioonly',
					quality: 'highestaudio',
				}).pipe(res);
			}

			var a_title = '';
			
			getTitleAudio(a_url).then(downloadAUDIO).then(console.log(a_title+' LOAD'))
		}

		var list_url = req.query.url
		var isit_playlist = list_url.indexOf('playlist')
		
		if (isit_playlist != -1){
			var s_url = list_url;
			var link_list = new Array();

			ytlist(s_url, 'url').then(res => {
				link_list = res.data.playlist;
			});
			console.log(link_list.length)
			
			for(i = 0; i<link_list.length; i++){
				console.log(link_list[i]);
				// AUDIOfunction(link_list[i]).then() 
			}
		}
		else{
			AUDIOfunction(list_url);
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
					v_title = info.videoDetails.title.replace(/[^\x00-\x7F]/g, "");
				resolve (info.title)
				console.log(info.title)
			   })
			})
		 } 
		
		function downloadVIDEO(){			
			res.header('Content-Disposition', `attachment; filename="${v_title}.mp4"`);
			ytdl(v_url, {
				format: 'mp4',
				quality: 'highestvideo',
			}).pipe(res);
		}
		
		var v_url = req.query.url;
		var v_title = '';
		
		getTitleVideo(v_url).then(downloadVIDEO)

	} catch (err) {
		console.error(err);
	}
});

app.listen(PORT, () => {
	console.log(`Server Works !!! At port ${PORT}`);
});