const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const axios = require('axios');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

app.get("/", (req,res) => {

	axios.get('https://api.github.com/users', {headers: {'Accept': 'application/vnd.github.v3+json'}}).then((response) => {
		res.send(response.data);
	})
	.catch((error) => {
		console.log(error);
	});
	
});

app.get("/:username", (req,res) => {

	axios.get('https://api.github.com/users/' + req.params.username, {headers: {'Accept': 'application/vnd.github.v3+json'}}).then((response) => {
		res.send(response.data);
	})
	.catch((error) => {
		console.log(error);
	});
	
});


app.listen(3000, () => {
	console.log('Listening to port 3000');
});