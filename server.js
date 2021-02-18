if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');
require('./data/reddit-db');

const app = express();
const PORT = process.env.PORT;

const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');

const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

//=================================MIDDLEWARE=================================\\

const checkAuth = (req, res, next) => {
  if (
    typeof req.cookies.nToken === 'undefined' ||
    req.cookies.nToken === null
  ) {
    req.user = null;
  } else {
    const token = req.cookies.nToken;
    const decodedToken = jwt.decode(token, { complete: true }) || {};
    req.user = decodedToken.payload;
  }
  next();
};

app.use(cookieParser());

// Handlebars
app.engine(
  'hbs',
  exphbs({
    defaultLayout: 'main',
    extname: '.hbs',
  })
);
app.set('view engine', 'hbs');

app.use(express.static('public'));

// Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Add after body parser initialization!
app.use(expressValidator());

app.use(checkAuth);

//==================CONTROLLERS=======================\\

//Authentication App
require('./controllers/auth.js')(app);
require('./controllers/posts.js')(app);
require('./controllers/comments.js')(app);
require('./controllers/replies.js')(app);

//====================LISTEN============================\\
module.exports = app;

app.listen(PORT, () => {
  console.log(`Listening on port localhost:${PORT}!`);
});
