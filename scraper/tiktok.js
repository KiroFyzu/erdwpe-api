const axios = require('axios')
const cheerio = require('cheerio')
const axios3 = require('axios');

async function tikmateApp(url) {
    const { data } = await axios3.post('https://api.tikmate.app/api/lookup',
        'url=' + encodeURIComponent(url),
        {
            headers: {
                referer: 'https://tikmate.app',
            }
        })
    return {
        ...data,
        videoUrl: `https://tikmate.app/download/${data.token}/${data.id}.mp4`,
        videoUrlHd: `https://tikmate.app/download/${data.token}/${data.id}.mp4?hd=1`,
    }
}
	


module.exports = tikmateApp