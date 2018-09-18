//------------- SECURE THE ROUTE, "CHECKPOINT" ⛔️ ---------------------

function secureRoute(req, res, next) {
  console.log('WE\'RE IN SECURE ROUTE');
  console.log(req.session.userId);
  //if no user in the session and redirect to login
  if(!req.session.userId) {
    //clear out the session and redirect to Login
    return req.session.regenerate(() => {
      req.flash('danger', 'not authorized');
      res.redirect('/login');
    });
  }
  //otherwise, allow request to reach its destination
  next();
}

// ========== module exports ==========
module.exports = secureRoute;
