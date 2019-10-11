import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import users from './users';
import countries from './countries';

const app = express();

app.use(cors());
app.use(express.static('static'));
app.use(bodyParser.json());
app.use(express.static('../build'));

app.get('/', function(req, res) {
  res.send('Hello world my friend');
});

app.post('/auth/login', function(req, res) {
  res.json({
    token: 'token-here',
    user: {
      key: 1,
      username: 'miguelcast',
      role: 'admin',
    },
  });
});

app.post('/auth/logout', function(req, res) {
  res.json({ result: 'ok' });
});

app.get('/users', function(req, res) {
  res.json(users);
});

app.get('/user/:key', function(req, res) {
  res.json(users.find(item => item.key === req.params.key));
});

app.get('/countries', function(req, res) {
  res.json(countries);
});

const server = app.listen(4000, function() {
  console.log('Example app listening on port ' + server.address().port);
});
