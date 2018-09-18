//  ~~~~~~~~~~ ROUTER, "traffic" 👮🏻‍♂️ ~~~~~~~~~~~~~~

const router = require('express').Router();
const postsController = require('../controllers/posts');
const registrationsController = require('../controllers/registrations');
const sessionsController = require('../controllers/sessions');

// IMPORTANT -- this allows us to stop unauthenticated users
// accessing specific routes
const secureRoute = require('../lib/secureRoute');

// ~~~ directs to Homepage
router.get('/', (req, res) => res.render('home'));

// ~~~ to index
router.route('/posts')
  .get(postsController.index)
  .post(secureRoute, postsController.create);

// ~~~ "create a new post"
router.get('/posts/new', secureRoute, postsController.new);

// ~~~ show, modify or delete a specific post
router.route('/posts/:id')
  .get(postsController.show)
  .put(secureRoute, postsController.update)
  .delete(secureRoute, postsController.delete);

// ~~~ "Edit a post"
router.get('/posts/:id/edit', secureRoute, postsController.edit);

// ~~~ Create or Delete a comment
router.post('/posts/:id/comments', secureRoute, postsController.createComment);
router.delete('/posts/:id/comments/:commentId', secureRoute, postsController.deleteComment);

// ~~~ Register
router.route('/register')
  .get(registrationsController.new)
  .post(registrationsController.create);

// ~~~ Login
router.route('/login')
  .get(sessionsController.new)
  .post(sessionsController.create);

// ~~~ LogOut
router.get('/logout', sessionsController.delete);

// ~~~  Error 404
router.route('/*').all((req, res) => res.status(404).render('404'));

// ========== module exports ==========
module.exports = router;
