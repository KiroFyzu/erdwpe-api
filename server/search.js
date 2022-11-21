const express = require('express')
var router = express.Router();
//scraper
const {
  pinterest,
  webp2mp4Url,
  covid,
} = require("../scraper/pinterest");

router.get('/google', async(req, res) => {
	var query = req.query.query
	if (!query) return res.json({ message: 'masukan parameter query' })
	var google = require('google-it')
	var result = google({'query': query}).then(result => {
	res.json({ result })
	})
})
router.get('/pinterest', async(req, res) => {
	var query = req.query.query
	if (!query) return res.json({ message: 'masukan parameter query' })
	var result = await pinterest(query)
	res.json({ result })
})
router.get('/covid', async(req, res, next) => {
	//const link = req.query.link;
	//if(!link) return res.json(loghandler.notlink)		
	covid()			
	.then(result => {			
	res.json(result)
			  })
			});		

			module.exports = router