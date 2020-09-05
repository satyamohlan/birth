const express = require('express');
const mongoose = require('mongoose');
const db = require('./config/keys').MongoUri;
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('mongo db connected'))
  .catch((err) => console.log(err));
const app = express();
const port = process.env.PORT || 3000;
app.set('view engine', 'ejs');
app.use('/css', express.static('views/css'));
app.use('/images', express.static('views/images'));
app.use('/js', express.static('views/js'))
app.get('/', (req, res) => res.render('index'));
app.get('/bday', (req, res) => {
  let date = req.query.date;
  let bday = new Date(date);
  let today = new Date();
  var age = {};
  var birth = {};
  age.time = today.getTime() - bday.getTime();

  age.years = (age.time / (1000 * 60 * 60 * 24 * 365.25)).toFixed(1);
  age.months = (age.time / (1000 * 60 * 60 * 24 * 12)).toFixed();
  age.days = (age.time / (1000 * 60 * 60 * 24)).toFixed(0);
  age.hours = (age.time / (1000 * 60 * 60)).toFixed(0);
  age.minutes = (age.time / (1000 * 60)).toFixed(0);
  age.seconds = (age.time / 1000).toFixed(0);
  age.slept = {};
  age.slept.years = (age.years / 3).toFixed(1);
  age.slept.days = (age.days / 3).toFixed();
  birth.day = day(bday.getDay());
  birth.date = bday.getDate();
  birth.month = month(bday.getMonth());
  birth.year = bday.getFullYear();
  res.render('result', {
    age,
    birth,

  });
});
app.get('/countdown', (req, res) => {
  let date = req.query.date;
  let bday = new Date(date);
  let today = new Date();
  let nbday = new Date(date);
  nbday.setFullYear(today.getFullYear() + 1);
  today.setHours(today.getHours() + 5, today.getMinutes() + 30);

  let nextbday = {};

  nextbday.time = nbday.getTime() - today.getTime();
  nextbday.days =
    (nextbday.time - (nextbday.time % (1000 * 60 * 60 * 24))) /
    (1000 * 60 * 60 * 24);
  nextbday.hours =
    (nextbday.time - (nextbday.time % (1000 * 60 * 60))) / (1000 * 60 * 60) -
    nextbday.days * 24;
  nextbday.minutes =
    (nextbday.time - (nextbday.time % (1000 * 60))) / (1000 * 60) -
    (nextbday.days * 24 + nextbday.hours) * 60;
  nextbday.seconds =
    (nextbday.time - (nextbday.time % 1000)) / 1000 -
    (nextbday.days * 24 * 60 + nextbday.hours * 60 + nextbday.minutes) * 60;
  res.json(nextbday);
})
app.listen(port, () => console.log(`listening on port ${port}`));

function day(date) {
  var weekday = new Array(7);
  weekday[0] = 'Sunday';
  weekday[1] = 'Monday';
  weekday[2] = 'Tuesday';
  weekday[3] = 'Wednesday';
  weekday[4] = 'Thursday';
  weekday[5] = 'Friday';
  weekday[6] = 'Saturday';
  return weekday[date];
}

function month(date) {
  var months = new Array(12);
  months[0] = 'January';
  months[1] = 'February';
  months[2] = 'March';
  months[3] = 'April';
  months[4] = 'May';
  months[5] = 'June';
  months[6] = 'July';
  months[7] = 'August';
  months[8] = 'September';
  months[9] = 'October';
  months[10] = 'November';
  months[11] = 'December';
  return months[date];
}