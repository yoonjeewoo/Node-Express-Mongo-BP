const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');


/* =======================
 LOAD THE CONFIG
 ==========================*/
const config = require('./config');
const port = process.env.PORT || 3000;

/* =======================
 EXPRESS CONFIGURATION
 ==========================*/
const app = express();
process.on('uncaughtException', function(err) {
	console.log('Caught exception: ' + err);
});
app.use(function(req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	next();
});
// parse JSON and url-encoded query
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static('apidoc'));
app.get('/', (req, res) => {
	res.send('alive')
});
// print the request log on console
app.use(morgan(':remote-addr'), function(req, res, next) {
	next();
});

app.use(morgan(':method'), function(req, res, next) {
	next();
});

app.use(morgan(':url'), function(req, res, next) {
	next();
});

app.use(morgan(':date'), function(req, res, next) {
	next();
});

app.use(morgan(':status'), function(req, res, next) {
	next();
});

// set the secret key variable for jwt
app.set('jwt-secret', config.secret);
// index page, just for testing

app.use('/api', require('./routes/api'));

// open the server
app.listen(port, () => {
	// console.log(`Express is running on port ${port}`)
});


/* =======================
 CONNECT TO MONGODB SERVER
 ==========================*/
mongoose.connect(config.mongodbUri);
const db = mongoose.connection;
db.on('error', console.error);
db.once('open', () => {
	// console.log('connected to mongodb server')
});