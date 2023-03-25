import passport from "passport";
import { User } from "./models/Users.js";

passport.use(User.createStrategy());
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());
passport.serializeUser(function(user, cb) {
  process.nextTick(function() {
    console.log("Serialize user " + user);
    cb(null, { id: user.id, username: user.username });
  });
});
passport.deserializeUser(function(userId, done) {
    User.findById(userId, function(err, user) {
      if (err) {
        return done(err);
      }
      done(null, user);
    });
  });

export default passport;