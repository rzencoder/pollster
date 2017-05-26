'use strict';

var Users = require('../models/users.js');
var Polls = require('../models/polls.js');

function ClickHandler() {

  this.getProfile = function(req, res) {
    Polls
      .find({
        'owner': req.user.username
      }, {
        "_id": false
      })
      .exec(function(err, result) {
        if (err) {
          return console.log(err)
        };
        res.json({
          data: result,
          user: req.user
        });
      })
  }

  this.getAllPolls = function(req, res) {
    Polls
      .find({}, {
        "_id": false
      })
      .exec(function(err, result) {
        if (err) {
          return console.log(err)
        };
        res.json({
          data: result,
          user: req.user
        });
      })
  }

  this.getPoll = function(req, res) {
    let q = req.params.question;
    Polls
      .findOne({
        "question": q
      }, {
        "_id": false
      })
      .exec(function(err, result) {
        if (err) {
          return console.log(err)
        };
        if (result !== null) {
          res.render('poll', {
            data: result,
            user: req.user ? req.user : null
          });
        }
      })
  }

  this.addVote = function(req, res) {
    let q = req.params.question;
    Polls
      .findOne({
        "question": q
      }, {})
      .exec(function(err, result) {
        if (err) {
          return console.log(err)
        };
        if (result !== null) {
          var b = '/poll/' + q + '/result'
          result.options.forEach(item => {
            if (item.option === req.body.option) {
              item.votes += 1;
              Polls.findOneAndUpdate({
                "question": q
              }, result, {
                upsert: true
              }, function(err, doc) {
                if (err) {
                  return res.send(500, {
                    error: err
                  })
                };
                return res.json({
                  data: result,
                  user: req.user ? req.user : null
                });
              })
            }
          });
        }
      })
  }

  this.deletePoll = function(req, res) {
    Polls.remove({
      'question': req.params.question
    }, function(err) {
      if (!err) {
        res.send('deleted')
      } else {
        console.log(err);
      }
    });
  }

  this.addPoll = function(req, res) {
    var question = req.body.question;
    question.replace(/\?/g, "");
    var answers = req.body.option.filter(function(e) {
      return e
    });
    let arr = [];
    answers.forEach(op => {
      arr.push({
        option: op,
        votes: 0
      })
    });
    var pollster = new Polls({
      owner: req.user.username,
      question: question,
      options: arr
    });
    pollster.save(function(err, pollster) {
      if (err) return console.error(err);
      res.redirect('/profile');
    });
  };

  this.addOption = function(req, res) {
    var newOp = req.body.newoption;
    var question = req.params.question;
    Polls.findOne({
      question: question
    }, function(err, data) {
      data.options.push({
        option: newOp,
        votes: 1
      })
      data.save(function(err) {
        if (err) {
          console.error(err);
        }
        res.redirect('/poll/' + question)
      });
    });
  }

}

module.exports = ClickHandler;
