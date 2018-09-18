// ~~~~~~~~~~ CONTROLLER of POSTS ~~~~~~~~~~~~~~~~~~~
const  Post = require('../models/post');

function indexRoute(req, res) {
  Post
    .find()
    .populate('user')
    .sort({ name: 1 })
    .exec((err, posts) => {
      res.render('posts/index', { posts });
    });
}

function showRoute(req, res) {
  Post
    .findById(req.params.id)
    .populate('user comments.user')
    .exec((err, post) => {
      res.render('posts/show', { post });
    });
}

function newRoute(req, res) {
  res.render('posts/new');
}

function createRoute(req, res) {
  // req.body contains the form data (use body-parser)

  // IMPORTANT - this adds the currentUser to the form data so that it can be
  // referenced on the model -- possible because of `lib/auth.js`
  req.body.user = req.currentUser;
  Post.create(req.body, () => {
    res.redirect('/posts');
  });
}

function editRoute(req, res) {
  Post.findById(req.params.id, (err, post) => {
    res.render('posts/edit', { post });
  });
}

function updateRoute(req, res) {
  // put request (use method-override)
  console.log(req.body.caption);
  Post.findById(req.params.id, (err, post) => {
    post.set(req.body);
    post.save(() => {
      res.redirect(`/posts/${req.params.id}`);
    });
  });
}

function deleteRoute(req, res) {
  // DELETE requests (use method-override)
  Post.findById(req.params.id, (err, post) => {
    post.remove(() => {
      res.redirect('/posts');
    });
  });
}

function createCommentRoute(req, res) {
  // IMPORTANT - this adds the currentUser to the form data so that it can be
  // referenced on the model -- possible because of `lib/auth.js`
  req.body.user = req.currentUser;
  Post.findById(req.params.id, (err, post) => {
    post.comments.push(req.body);
    post.save(() => {
      res.redirect(`/posts/${req.params.id}`);
    });
  });
}

function deleteCommentRoute(req, res) {
  Post.findById(req.params.id, (err, post) => {
    const comment = post.comments.id(req.params.commentId);
    comment.remove();
    post.save(() => {
      res.redirect(`/posts/${req.params.id}`);
    });
  });
}


// ========== module exports ==========
module.exports = {
  index: indexRoute,
  show: showRoute,
  new: newRoute,
  create: createRoute,
  edit: editRoute,
  update: updateRoute,
  delete: deleteRoute,
  createComment: createCommentRoute,
  deleteComment: deleteCommentRoute
};
