"use strict";

var Post = require('../models/post');

module.exports = function (app) {
  app.get('/', function (req, res) {
    var currentUser = req.user;
    Post.find({}).lean().then(function (posts) {
      res.render('posts-index', {
        posts: posts,
        currentUser: currentUser
      });
    })["catch"](function (err) {
      console.log(err.message);
    });
  });
  app.get('/posts/new', function (req, res) {
    res.render('posts-new');
  }); // CREATE

  app.post('/posts/new', function (req, res) {
    if (req.user) {
      var post = new Post(req.body);
      post.save(function (err, post) {
        return res.redirect("/");
      });
    } else {
      return res.status(401); // UNAUTHORIZED
    }
  });
  app.get('/posts/:id', function (req, res) {
    Post.findById(req.params.id).lean().populate('comments').then(function (post) {
      res.render('posts-show', {
        post: post
      });
    })["catch"](function (err) {
      console.log(err.message);
    });
  }); // SUBREDDIT

  app.get('/n/:subreddit', function (req, res) {
    Post.find({
      subreddit: req.params.subreddit
    }).lean().then(function (posts) {
      res.render('posts-index', {
        posts: posts
      });
    })["catch"](function (err) {
      console.log(err);
    });
  });
};