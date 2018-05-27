const express = require('express');
const routes = require('./routes');
const bodyParser = require("body-parser");

const app = express();

app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Headers", "Content-Type");
	res.setHeader("Access-Control-Allow-Methods", "GET, POST");

	next();
});

app.use(bodyParser.urlencoded({
	extended: false
}));
app.use(bodyParser.json());
app.use(routes);

app.listen(6060, err => {
	if (!err) {
		console.log("Server is running at port 6060")
	}
})