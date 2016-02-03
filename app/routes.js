// app/routes.js

// grab the nerd model we just created
var Nerd = require('./models/nerd');
var Bear = require('./models/bear');

var express = require('express');
var jwt = require('express-jwt');

var jwtCheck = jwt({
  secret: new Buffer('nvC5GxMy28oxaQO9JmxIsRgLBJdaDs5GjdcyI0PzzmaaZKtqnANgnWUylk9JSG9q', 'base64'),
  audience: 'fxrksgu1aOqhoN0SqGLMZyAG3fFuPMNM'
});

	module.exports = function(app) {
		// server routes ===========================================================
		app.use(function(req, res, next) {
			console.log('Something is happening.');
			next();
		});

		// handle things like api calls
		// authentication routes
		app.use('/api/nerds', jwtCheck);
		app.use('/nerds', jwtCheck);

		// gets go here ===========================================
		app.get('/api/nerds', jwtCheck, function(req, res) {
			// use mongoose to get all nerds in the database
			Nerd.find(function(err, nerds) {
				// if there is an error retrieving, send the error. 
				// nothing after res.send(err) will execute
				if (err)
					res.send(err);

				res.json(nerds); // return all nerds in JSON format
			});
		});

		app.get('/api', function(req, res) {
			res.json({ message: 'hooray! welcome to our api!' });
		});

		app.get('/api/bears', function(req, res) {
			Bear.find(function(err, bears) {
				if (err)
					res.send(err);
				res.json(bears);
			});
		});

		app.get('/api/bears/:bear_id', function(req, res) {
			Bear.findById(req.params.bear_id, function(err, bear) {
				if (err)
					res.send(err);
				res.json(bear);
			});
		});

		// posts go here ============================================
		app.post('/api/bears', function(req, res) {
			var bear = new Bear();
			bear.name = req.body.name;
			
			bear.save(function(err) {
				if (err)
					res.send(err);
				res.json({ message: 'Bear created!' });
			});
		});

		// puts go here =============================================
		app.put('/api/bears/:bear_id', function(req, res) {
			Bear.findById(req.params.bear_id, function(err, bear) {
				if (err)
					res.send(err);
				bear.name = req.body.name;
				bear.save(function(err) {
					if (err)
						res.send(err);
					res.json({ message: 'Bear updated!' });
				});
			});
		});

		// deletes go here ==========================================
		app.delete('/api/bears/:bear_id', function(req, res) {
			Bear.remove({
				_id: req.params.bear_id
			}, function(err, bear) {
				if (err)
					res.send(err);
				res.json({ message: 'Successfully deleted' });
			});
		});

		// frontend routes =========================================================
		// route to handle all angular requests
		app.get('*', function(req, res) {
			res.sendfile('./public/index.html'); // load our public/index.html file
		});
	};

