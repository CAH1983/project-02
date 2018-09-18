// 3rd party packages
const express = require('express');
const ejsLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');
const session = require('express-session');
const methodOverride = require('method-override');
const flash = require('express-flash');
const mongoose = require('mongoose');
const routes = require('./config/routes');
const auth = require('./lib/auth');

// Create the app
const app = express();
const { port, dbURI } = require('./config/environment');

// connect to the database 📊
mongoose.connect(dbURI);

//set up of the views
app.set('view engine', 'ejs');
app.set('views', `${__dirname}/views`);

//use 3rd party packages 🎁
app.use(ejsLayouts);
app.use(express.static(`${__dirname}/public`));

app.use(bodyParser.urlencoded({ extended: true }));

// setup method-override
app.use(methodOverride(req => {
  if(req.body && typeof req.body === 'object' && '_method' in req.body) {
    const method = req.body._method;
    delete req.body._method;
    return method;
  }
}));

// express session 🍪
app.use(session({
  secret: 'shhh',
  save: false,
  saveUnitialized: false
}));

app.use(flash());

// custom auth middleware
app.use(auth);

// routes 🛣️
app.use(routes);

//request handlers
app.get('/', (req, res) => res.send('<h1>Hello world!</h1>'));

// App listen – listen for incoming traffic
app.listen(port, () => console.log(`Express is running on port ${port}`));
