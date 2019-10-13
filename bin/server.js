'use strict';

const express = require('express'),
	logger = require('../lib/logger'),
	middleware = require('../middleware'),
	routes = require('../routes'),
	Promise = require('bluebird');

let app = express();

app.set('view engine', 'pug');

function loadApplicationMiddleware() {
	return new Promise((resolve, reject) => {
		logger.info('Loading application middleware');
		app.use(middleware);
		resolve();
	});
}

function loadApplicationRoutes() {
	return new Promise((resolve, reject) => {
		logger.info('Loading application routes');
		app.use(routes);
		resolve();
	});
}

function startHttpServer() {
	return new Promise((resolve, reject) => {
		let port = process.env.PORT || 3000;
		logger.info(`Starting HTTP server on port ${port}`);
		app.listen(port, (err) => {
			if(err)
				return reject(err);
			resolve();
		});
	});
}


loadApplicationMiddleware()
	.then(loadApplicationRoutes)
	.then(startHttpServer)
	.catch((e) => {
		console.log(e);
	});

