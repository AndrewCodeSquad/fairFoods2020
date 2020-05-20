const express = require('express');
const mongodb = require('mongodb');
const body_parser = require('body-parser');
const path = require('path');

const PORT = 3000;
const app = express();

app.set('view engine', 'ejs');
// public folder for static CSS & image files
app.use(express.static(path.join(__dirname, 'public')));
// body-parser setup
app.use(body_parser.json());
app.use(body_parser.urlencoded({ extended:true }));

let db_handler;
const DB_URL = process.env.DB_URL; // process.env methods access secret info in .env file
const DB_NAME = process.env.DB_NAME; // commented out for squirt gun game
const COLLECTION_NAME = 'order';

app.get('/', (req, res) => {
	res.render('index');
	// res.send('Welcome to Fair Foods Reservations!');
});

app.post('/order', (req, res) => {
	const form_data = req.body;
	console.log(form_data);
	const clientName = form_data['clientName'];
	const bags = parseInt(form_data['bags']);

	const my_object = {
			clientName: clientName,
			bags: bags
	}

	db_handler.collection(COLLECTION_NAME).insertOne(my_object, (err, result) => {
			if (err) {
					console.log("Error: " + err);
			}
			else {
					console.log("Order accepted");
					res.redirect('/');
			}
	});
});

app.listen(PORT, () => {
	console.log(`Fair Foods server started on port ${PORT}!`);

	// let mongo_client = mongodb.MongoClient;
	// mongo_client.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true }, (err, db_client) => {
	// 		if (err) {
	// 				console.log("Error: " + err);
	// 		}
	// 		else {
	// 				console.log("Database Connected");
	// 				db_handler = db_client.db(DB_NAME);
	// 		}
	// });
})