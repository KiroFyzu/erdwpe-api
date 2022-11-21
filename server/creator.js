const express = require("express");
var router = express.Router();
const petPetGif = require("pet-pet-gif");
const {
  webp2mp4Url
} = require("../scraper/pinterest");
var { EmojiAPI } = require("emoji-api");
var emoji = new EmojiAPI();
const textToImage = require("text-to-image");
const canvacord = require("canvacord");
let cmc_api = require("cmc-info");
let cmc = new cmc_api("a9d7891e-5946-49f0-8734-8225f8a06d36");

router.get("/pet", async (param, res, next) => {
  const url = param.query.url;
  if (!url) return res.json({ message: "masukan parameter Username" });
  let animatedGif = await petPetGif(param.query.url, {
    resolution: 512, // The width (or height) of the generated gif
  });
  res.set({ "Content-Type": "image/gif" });
  res.send(animatedGif);
});
router.get("/triggered", async (param, res, next) => {
  const url = param.query.url ;
  if (!url) return res.json({ message: "masukan parameter URL" });
  let triggerd = await canvacord.Canvas.trigger(param.query.url );
  res.set({ "Content-Type": "image/gif" });
  res.send(triggerd);
});
router.get("/cmc", async (param, res, next) => {
  const query = param.query.query;
  if (!query) return res.json({ message: "masukan parameter Username" });
  cmc
    .requestCoinBySymbol(param.query.query)
    .then((data) => {
 const result = {
        result: {
          status: true,
          code: 200,
          creator: "erdwpe",
          Name: data.name,
          Symbol: data.symbol,
          Circulating_supply: data.circulating_supply,
          Total_supply: data.total_supply,
          Max_supply: data.max_supply,
          Date_added: data.date_added,
          Num_market_pairs: data.num_market_pairs,
          Tags: data.tags,
          Platform: data.platform,
          Cmc_rank: data.cmc_rank,
          Data: data.quote,
        },
      };
      res.json(result);
       })
    .catch((error) => {
      console.error("error");
    });
});

router.get("/webptomp4", async (req, res) => {
  var url = req.query.url;
  if (!url) return res.json({ message: "masukan parameter query" });
  var result = await webp2mp4Url(url);
  try {
    res.json(result);
  } catch (err) {
    console.log(err);
    res.json({ message: "Ups, error" });
  }
});
router.get("/ttp", async (param, res, next) => {
  const text = param.query.text;
  if (!text) return res.json({ message: "masukan parameter text" });
  textToImage
    .generate(param.query.text)
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.json(error);
    });
});
router.get("/emoji2png", async (req, res, next) => {
  const Emoji = req.query.text;
  if (!Emoji) return res.json(loghandler.nottext);
  emoji
    .get(Emoji)
    .then((img_emoji) => {
      const result = {
        result: {
          status: true,
          code: 200,
          creator: "erdwpe",
          result: img_emoji.images[0].url,
        },
      };
      res.json(result);
    })

    .catch((err) => {
      res.json(loghandler.error);
    });
});
module.exports = router
