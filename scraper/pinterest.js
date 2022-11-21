const cheerio = require('cheerio')
const axios = require('axios')
const FormData = require("form-data")

function pinterest(querry){
	return new Promise(async(resolve,reject) => {
		 axios.get('https://id.pinterest.com/search/pins/?autologin=true&q=' + querry, {
			headers: {
			"cookie" : "_auth=1; _b=\"AVna7S1p7l1C5I9u0+nR3YzijpvXOPc6d09SyCzO+DcwpersQH36SmGiYfymBKhZcGg=\"; _pinterest_sess=TWc9PSZHamJOZ0JobUFiSEpSN3Z4a2NsMk9wZ3gxL1NSc2k2NkFLaUw5bVY5cXR5alZHR0gxY2h2MVZDZlNQalNpUUJFRVR5L3NlYy9JZkthekp3bHo5bXFuaFZzVHJFMnkrR3lTbm56U3YvQXBBTW96VUgzVUhuK1Z4VURGKzczUi9hNHdDeTJ5Y2pBTmxhc2owZ2hkSGlDemtUSnYvVXh5dDNkaDN3TjZCTk8ycTdHRHVsOFg2b2NQWCtpOWxqeDNjNkk3cS85MkhhSklSb0hwTnZvZVFyZmJEUllwbG9UVnpCYVNTRzZxOXNJcmduOVc4aURtM3NtRFo3STlmWjJvSjlWTU5ITzg0VUg1NGhOTEZzME9SNFNhVWJRWjRJK3pGMFA4Q3UvcHBnWHdaYXZpa2FUNkx6Z3RNQjEzTFJEOHZoaHRvazc1c1UrYlRuUmdKcDg3ZEY4cjNtZlBLRTRBZjNYK0lPTXZJTzQ5dU8ybDdVS015bWJKT0tjTWYyRlBzclpiamdsNmtpeUZnRjlwVGJXUmdOMXdTUkFHRWloVjBMR0JlTE5YcmhxVHdoNzFHbDZ0YmFHZ1VLQXU1QnpkM1FqUTNMTnhYb3VKeDVGbnhNSkdkNXFSMXQybjRGL3pyZXRLR0ZTc0xHZ0JvbTJCNnAzQzE0cW1WTndIK0trY05HV1gxS09NRktadnFCSDR2YzBoWmRiUGZiWXFQNjcwWmZhaDZQRm1UbzNxc21pV1p5WDlabm1UWGQzanc1SGlrZXB1bDVDWXQvUis3elN2SVFDbm1DSVE5Z0d4YW1sa2hsSkZJb1h0MTFpck5BdDR0d0lZOW1Pa2RDVzNySWpXWmUwOUFhQmFSVUpaOFQ3WlhOQldNMkExeDIvMjZHeXdnNjdMYWdiQUhUSEFBUlhUVTdBMThRRmh1ekJMYWZ2YTJkNlg0cmFCdnU2WEpwcXlPOVZYcGNhNkZDd051S3lGZmo0eHV0ZE42NW8xRm5aRWpoQnNKNnNlSGFad1MzOHNkdWtER0xQTFN5Z3lmRERsZnZWWE5CZEJneVRlMDd2VmNPMjloK0g5eCswZUVJTS9CRkFweHc5RUh6K1JocGN6clc1JmZtL3JhRE1sc0NMTFlpMVErRGtPcllvTGdldz0=; _ir=0"
		}
			}).then(({ data }) => {
		const $ = cheerio.load(data)
		const result = [];
		const hasil = [];
   		 $('div > a').get().map(b => {
        const link = $(b).find('img').attr('src')
            result.push(link)
		});
   		result.forEach(v => {
		 if(v == undefined) return
		 hasil.push(v.replace(/236/g,'736'))
			})
			hasil.shift();
		resolve(hasil)
		})
	})
}
async function sticker3(img, url, pack, author) {
  url = url ? url : await uploadImage(img);
  let res = await fetch(
    "https://hardianto.xyz/api/tools/stickerwm?" +
      new URLSearchParams(
        Object.entries({
          urlFile,
          author,
          pack,
        })
      )
  );
  return await res.buffer();
}
function covid(){
	return new Promise(async(resolve, reject) => {
		axios.get('https://covid19.go.id/')
		.then(({ data }) => {
			const $ = cheerio.load(data)
			const hasil = [];
			$('#case > div > div > div > div > div:nth-child(2)').each(function(a,b) {
				const pindo = $(b).find('div:nth-child(3) > strong').text()
				const mindo = $(b).find('div:nth-child(5) > strong').text()
				const sindo = $(b).find('div:nth-child(4) > strong').text()
				const upindo = $(b).find('div.pt-4.text-color-black.text-1').text().trim()
			$('#case > div > div > div > div > div:nth-child(1)').each(function(c,d) {
					const neg = $(d).find('div:nth-child(3) > strong').text() 
					const pglo = $(d).find('div:nth-child(4) > strong').text()
					const nglo = $(d).find('div:nth-child(5) > strong').text()
					const up = $(d).find('div.pt-4.text-color-grey.text-1').text().trim()
				const result = {
					message: 'By ERDWPE',
					indo : {
						positif_indo: pindo,
						meninggal_indo: mindo,
						sembuh_indo: sindo,
						update_indo: upindo.split(':')[1]
					},
					global: {
						negara: neg,
						positif: pglo,
						meninggal: nglo,
						update: up.split(':')[1].split('\n')[0]
					

					}
				}
				hasil.push(result)
				})
			})
			resolve(hasil)
		})
		.catch(reject)
	})
}
function webp2mp4Url(url) {
  return new Promise((resolve, reject) => {
    axios
      .get(`https://ezgif.com/webp-to-mp4?url=${url}`)
      .then(({ data }) => {
        const $ = cheerio.load(data);
        const bodyFormThen = new FormData();
        const file = $('input[name="file"]').attr("value");
        const token = $('input[name="token"]').attr("value");
        const convert = $('input[name="file"]').attr("value");
        const gotdata = {
          file: file,
          token: token,
          convert: convert,
        };
        bodyFormThen.append("file", gotdata.file);
        bodyFormThen.append("token", gotdata.token);
        bodyFormThen.append("convert", gotdata.convert);
        axios({
          method: "post",
          url: "https://ezgif.com/webp-to-mp4/" + gotdata.file,
          data: bodyFormThen,
          headers: {
            "Content-Type": `multipart/form-data; boundary=${bodyFormThen._boundary}`,
          },
        })
          .then(({ data }) => {
            const $ = cheerio.load(data);
            const result =
              "https:" +
              $("div#output > p.outfile > video > source").attr("src");
            resolve({
              status: true,
              message: "Created By ERDWPE",
              result: result,
            });
          })
          .catch(reject);
      })
      .catch(reject);
  });
}

module.exports = {
  pinterest,
  covid,
  webp2mp4Url,
};

