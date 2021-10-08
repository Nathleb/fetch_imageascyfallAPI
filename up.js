require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const mongo = require("./db/conn");
const Card = require("./models/Card");
const querystring = require("querystring");
const { lstat } = require("fs");

const images = "./imagesd/";
const fs = require("fs");
mongo();

// fs.readdir(images, (err, files) => {
// 	if (err) throw err;
// 	files.forEach((file) => {
// 		Card.updateOne(
// 			{ img: { $exists: 0 }, id: file.slice(0, -4) },
// 			{ $set: { img: fs.readFileSync(images + file) } },
// 			(err, result) => {
// 				if (err) throw err;
// 				console.log(result);
// 				return;
// 			}
// 		);
// 	});

// 	return;
// });

// fs.readdir(images, (err, files) => {
// 	if (err) throw err;
// 	files.forEach((file) => {
// 		Card.findOne(
// 			{ img: { $exists: 1 }, name: file.slice(0, -4) },
// 			(err, result) => {
// 				fs.unlink(images + result.name + ".png", (err) => {
// 					if (err) {
// 						console.error(err);
// 						return;
// 					}
// 				});
// 				return;
// 			}
// 		);
// 	});
// });

Card.count({img: { $exists: 1 }}, (err, result) => {
	console.log(result);
	return;
});
