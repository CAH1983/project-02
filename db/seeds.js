const mongoose = require('mongoose');
const {dbURI } = require('../config/environment');

const Post = require('../models/post');
const User = require('../models/user');

mongoose.connect(dbURI, (err, db) => {
  db.dropDatabase(() => { // delete the database ready for new database
  //~~~~~ users
    User.create([{
      username: 'cah1983',
      email: 'carolineho1983@yahoo.fr',
      password: 'pass',
      passwordConfirmation: 'pass'
    },
    {
      username: 'machine-man',
      email: 'machine@man.com',
      password: 'pass',
      passwordConfirmation: 'pass'
    },
    {
      username: 'lana-delrey',
      email: 'lana@delrey.com',
      password: 'pass',
      passwordConfirmation: 'pass'
    }],

    // ~~~~~~~~ pictures
    (err, users) => {
      if(err) console.log(err);
      else console.log(`${users.length} users created`);

      Post.create([{
        image: '/images/palm-trees.jpg',
        caption: '#palmtrees 🌴 #holidays 🐚 #Instaclonevibes',
        user: users[2]
      },
      {
        image: '/images/fashion-week.jpg',
        caption: '#FashionWeek #CatWalk #Milano',
        user: users[0]
      },
      {
        image: '/images/male-model-stairs.jpeg',
        caption: '#chillin #summertime',
        user: users[0]
      },
      {
        image: '/images/dj.jpg',
        caption: '#Djaying #Amsterdam #Festival',
        user: users[1]
      },
      {
        image: '/images/AI-brain.jpg',
        caption: 'Inserting a chip in a human brain 🧠 + 💾',
        user: users[1]
      },
      {
        image: '/images/lana-delrey.jpg',
        caption: 'About last night in LA ... ',
        user: users[2]
      }],

      (err, posts) => {
        if(err) console.log(err);
        else console.log(`${posts.length} posts created`);
        mongoose.connection.close();
      });
    });
  });
});
