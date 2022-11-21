const express = require('express')
var router = express.Router();
const axios = require('axios');
const hx = require('hxz-api');
//scraper
const { mediafireDl, twitter, ytPlayMp3, ytPlayMp4 } = require('../scraper/index'); 
const tiktok = require("@xct007/tiktok-scraper");
let { igApi } = require("insta-fetcher");
let ig = new igApi("ds_user_id=4427199241;sessionid=4427199241%3AEYRdDuqdCYXL5D%3A7%3AAYcQY4chlzPU5hCmvr9Vseu541dI8Zp_Pyu4oV3aDA")


router.get("/playmp3", async(req, res, next) => {
    const query = req.query.query;
    if(!query) return res.json(loghandler.notquery)
    ytPlayMp3(query)
        .then((result) => {
            res.json(result);
        })
        .catch((error) => {
            res.json(error);
        });
});

router.get("/playmp4", async(req, res, next) => {
    const query = req.query.query;    
    if(!query) return res.json(loghandler.notquery)
    ytPlayMp4(query)
        .then((result) => {
            res.json(result);
        })
        .catch((error) => {
            res.json(error);
        });
});
router.get('/igdl', async(req, res) => {
	var link = req.query.link
	if (!link) return res.json({ message: 'masukan parameter Link' })
	ig.fetchPost(link).then(data => {
		res.json(data)
	  })
	});
router.get('/tiktok', async(req, res) => {
	var url = req.query.url
	if (!url) return res.json({ message: 'masukan parameter Link' })
	var hasil = await tiktok(url)
	try {
		res.json(hasil)
	} catch(err) {
		console.log(err)
		res.json({ message: 'Ups, error' })
	}
})

router.get('/igstory', async(req, res) => {
	var user = req.query.user
	if (!user) return res.json({ message: 'masukan parameter user' })
	ig.fetchStories(user).then(data => {
		res.json(data)
	  })
	});
	router.get('/twitter', async(req, res) => {
		var link = req.query.link
		if (!link) return res.json({ message: 'masukan parameter Link' })
		var hasil = await twitter(link)
		try {
			res.json(hasil)
		} catch(err) {
			console.log(err)
			res.json({ message: 'Ups, error' })
		}
	})
	router.get('/igstalk', async(req, res) => {
		var username = req.query.username
		if (!username) return res.json({ message: 'masukan parameter username' })
		ig.fetchUser(username).then(data => {
			res.json(data)
		  })
		});
	router.get('/youtubedl', async(req, res, next) => {
	const link = req.query.link;
	if(!link) return res.json({ message: 'masukan parameter Link' })
	hx.youtube(link)			
	.then(result => {			
	res.json(result)
			  })
			});
router.get('/mediafireDl', async(req, res) => {
	var link = req.query.link
	if (!link) return res.json({ message: 'masukan parameter Link' })
	var hasil = await mediafireDl(link)
	try {
		res.json(hasil)
	} catch(err) {
		console.log(err)
		res.json({ message: 'Ups, error' })
	}
})


module.exports = router