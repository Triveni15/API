const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const axios = require('axios');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

app.get("/", (req,res) => {

	res.render('index');
	
});

app.post("/", (req,res) => {

	res.redirect('/users/' + req.body.id);
	
});

app.get("/users", (req,res) => {

	axios.get('https://api.github.com/users', {headers: {'Accept': 'application/vnd.github.v3+json'}}).then((response) => {
		res.render('fetch', {userList: response.data});
	})
	.catch((error) => {
		res.render('not_found');
	});
	
});

app.get("/users/:username", (req,res) => {

	axios.get('https://api.github.com/users/' + req.params.username, {headers: {'Accept': 'application/vnd.github.v3+json'}}).then((response) => {
		console.log(response.headers);
		res.render('search', {user: response.data})
	})
	.catch((error) => {
		res.render('not_found');
	});
	
});

app.get("/users/:username/followers", (req,res) => {

	axios.get('https://api.github.com/users/' + req.params.username + '/followers', {headers: {'Accept': 'application/vnd.github.v3+json'}}).then((response) => {
		res.render('fetch', {userList: response.data});
	})
	.catch((error) => {
		res.render('not_found');
	});
	
});

app.get("/users/:username/following", (req,res) => {

	axios.get('https://api.github.com/users/' + req.params.username + '/following', {headers: {'Accept': 'application/vnd.github.v3+json'}}).then((response) => {
		res.render('fetch', {userList: response.data});
	})
	.catch((error) => {
		res.render('not_found');
	});
	
});


app.listen(3000, () => {
	console.log('Listening to port 3000');
});