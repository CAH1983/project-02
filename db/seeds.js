// ~~~~~~~~~~~~~~~~ DATA BASE Content ~~~~~~~~~~~~~~~~~~~~

const mongoose = require('mongoose');
const {dbURI } = require('../config/environment');

const Post = require('../models/post');
const User = require('../models/user');

mongoose.connect(dbURI, (err, db) => {
  db.dropDatabase(() => { // delete the database ready for new database
  //~~ user's login info
    User.create({
      username: 'cah1983',
      email: 'carolineho1983@yahoo.fr',
      password: 'pass',
      passwordConfirmation: 'pass'
    }, (err, user) => {
      if(err) console.log(err);
      else console.log('user created');
      // ~~ content of the post
      Post.create({
        image: 'http://www.emcartaz.net/wp-content/uploads/2017/05/Julia-16-dias-Chiquinha-MR.jpg',
        caption: 'nerdy baby',
        user: user
      }, (err) => {
        if(err) console.log(err);
        else console.log('post created');
        mongoose.connection.close();
      });
    });
  });
});
