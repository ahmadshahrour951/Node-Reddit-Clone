if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const expressValidator = require('express-validator');
const exphbs = require('express-handlebars');
const checkAuth = require('./middleware/checkauth');

require('./data/reddit-db');
const PORT = process.env.PORT;

const app = express();

//==================MIDDLEWARE=======================\\
// Cookie Parser
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

// Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Add after body parser initialization!
app.use(expressValidator());

// Login Status
app.use(checkAuth());

//==================CONTROLLERS=======================\\

require('./controllers/posts.js')(app);
require('./controllers/comments.js')(app);
require('./controllers/auth.js')(app);

//====================LISTEN============================\\
module.exports = app;

app.listen(PORT, () => {
  console.log(`Listening on port localhost:${PORT}!`);
});
