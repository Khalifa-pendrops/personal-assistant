const express = require("express");
const passport = require("passport");
const {
  UserLogin,
  RegisterUser,
  VerifyToken,
} = require("../controllers/authController");
const router = express.Router();

router.post("/login", UserLogin);
router.post("/register", RegisterUser);
router.get("/verify", VerifyToken);

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/",
  }),
  (req, res) => {
    res.redirect("/dashboard");
  }
);

module.exports = router;
