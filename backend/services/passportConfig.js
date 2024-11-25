const { Strategy: GoogleStrategy } = require("passport-google-oauth20");
const User = require("../models/User");

const googleStrategy = new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/api/auth/google/callback",
  },

  async (accessToken, refreshToken, profile, done) => {
    try {
      let user = await User.findOne({ email: profile.emails[0].value });
      if (!user) {
        user = new User({
          email: profile.emails[0].value,
          password: "",
        });
        await user.save();
      }
      done(null, user);
    } catch (error) {
      done(error, null);
    }
  }
);

module.exports = {googleStrategy};
