require("dotenv").config();
const mongo = require("./db/conn");
const Card = require("./models/Card");

mongo();

const querystring = require("querystring");

const H = require("highland");
const axios = require("axios");
const axiosSaveFile = require("axios-savefile");

const BASE_URL = "https://api.scryfall.com";
const IMAGE_DIR = "imagesdo";

Card.find(
	{ img: { $exists: 0 }, layout: { $ne: "transform" } },
	(err, result) => {
		if (err) throw err;
		const cards = result.reduce((acc, curr) => {
			if (curr.name.includes("/"))
				acc.push({ card: curr.id, image: curr.image_uris.normal });
			return acc;
		}, []);

		const saveImage = (info) => {
			const url = info.image;
			const savePath = `${__dirname}/${IMAGE_DIR}/${info.card}.png`;
			console.log(url, savePath);
			return H(axiosSaveFile(url, savePath));
		};

		H(cards)
			.ratelimit(1, 100)
			.flatMap(saveImage)
			.errors(console.log)
			.done(() => {});
	}
);
