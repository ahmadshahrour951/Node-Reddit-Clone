if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const exphbs = require('express-handlebars');

require('./data/reddit-db');
const Post = require('./models/post');
const PORT = process.env.PORT;

const app = express();

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

//==================CONTROLLERS=======================\\
require('./controllers/posts.js')(app);
require('./controllers/comments.js')(app);

  app.get('/', (req, res) => {
    Post.find({})
      .lean()
      .then((posts) => {
        res.render('posts-index', { posts });
      })
      .catch((err) => {
        console.log(err.message);
      });
  });


//====================LISTEN============================\\
module.exports = app;

app.listen(PORT, () => {
  console.log(`Listening on port localhost:${PORT}!`);
});
