if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const express = require('express');
require('./data/reddit-db');

const app = express();
const PORT = process.env.PORT;

const bodyParser = require('body-parser');
const expressValidator = require('express-validator');

// Handlebars
const exphbs = require('express-handlebars');
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

//==================CONTROLLERS=======================\\
require('./controllers/posts.js')(app);

app.get('/', (req, res) => {
  res.render('home');
});

app.get('/posts/new', (req, res) => {
  res.render('posts-new')
});

//====================LISTEN============================\\
module.exports = app;

app.listen(PORT, () => {
  console.log(`Listening on port localhost:${PORT}!`);
});
