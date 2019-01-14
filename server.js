const express = require('express');
const passport = require('passport'), LocalStrategy = require('passport-local').Strategy;
const path = require('path');
const app = express();
const port = 3000;
const router = express.Router();

passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));

router.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/index.html'));
  //__dirname : It will resolve to your project folder.
});
 
router.post('/login',
  passport.authenticate(),
  function(req, res) {
    // If this function gets called, authentication was successful.
    // `req.user` contains the authenticated user.
    res.redirect('/users/' + req.user.username);
  });
  
  app.use('/', router);
  app.listen(port, () => console.log(`Example app listening on port ${port}!`));