'use strict';
var path = process.cwd();
var ClickHandler = require(path + '/app/controllers/clickHandler.server.js');
var clickHandler = new ClickHandler();

module.exports = function(app, passport) {

  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    } else {
      res.redirect('/login');
    }
  }

  app.route('/')
    .get(function(req, res) {
      res.render('index');
    });

  app.route('/about')
    .get(function(req, res) {
      res.render('about');
    });

  app.route('/login')
    .get(function(req, res) {
      res.render('login')
    });

  app.route('/logout')
    .get(function(req, res) {
      req.logout();
      res.redirect('/');
    });

  app.route('/polls')
    .get(function(req, res) {
      res.render('polls');
    });

  app.route('/getpolls')
    .get(clickHandler.getAllPolls);

  app.route('/poll/:question')
    .get(clickHandler.getPoll);

  app.route('/poll/:question')
    .post(clickHandler.addVote);

  app.route('/poll/:question/addoption')
    .post(clickHandler.addOption);

  app.route('/profile')
    .get(isLoggedIn, function(req, res) {
      res.render('profile');
    });

  app.route('/newpoll')
    .get(isLoggedIn, function(req, res) {
      res.render('newpoll');
    });

  app.route('/newpoll')
    .post(isLoggedIn, clickHandler.addPoll);

  app.route('/delete/:question')
    .post(isLoggedIn, clickHandler.deletePoll);

  app.route('/api/:id')
    .get(isLoggedIn, clickHandler.getProfile);

  app.route('/auth/github')
    .get(passport.authenticate('github'));

  app.route('/auth/github/callback')
    .get(passport.authenticate('github', {
      successRedirect: '/profile',
      failureRedirect: '/'
    }));

};
