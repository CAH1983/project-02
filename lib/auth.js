// ------------- AUTHENTICATE THE USER 👤 ----------------

const User = require('../models/user');

function auth(req, res, next) {
  //if no userId in the sessionsController
  if(!req.session.userId) return next();

  User.findById(req.session.userId, (err, user) => { //if no user found, clear session and redirected

    if(!user) return req.session.regenerate(() => {
      req.flash('danger', 'Your session has expired');
      return res.redirect('/login');
    });


    res.locals.isAuthenticated = true; // allows show/hide buttons and links

    res.locals.currentUser = user; //personalize pages

    req.currentUser = user; // access the datas in the controllers

    next();
  });
}

// ========== module exports ==========
module.exports = auth;
