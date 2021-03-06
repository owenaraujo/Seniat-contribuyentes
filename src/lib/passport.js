const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const pool = require("../database");
const helpers = require("./helpers");

passport.use(
  "local.signin",
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, username, password, done) => {
      const rows = await pool.query(
        "SELECT id,username,password FROM usuarios WHERE username = ? ",
        [username]
      );
      if (rows.length > 0) {
        const user = rows[0];
        const validPassword = await helpers.matchPassword(
          password,
          user.password
        );
        if (validPassword) {
          done(null, user, req.flash("success", "Bienvenido " + user.username));
        } else {
          done(null, false, req.flash("message", "Contraseña Incorrecta"));
        }
      } else {
        return done(null, false, req.flash("message", "El usuario no existe"));
      }
    }
  )
);

passport.use(
  "local.signup",
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, username, password, done) => {
      try {
        const { pregunta_seguridad, respuesta } = req.body;
        let newUser = {
          username,
          password,
          pregunta_seguridad,
          respuesta,
        };
        newUser.password = await helpers.encryptPassword(password);
        // Saving in the Database
        const result = await pool.query("INSERT INTO usuarios SET ? ", newUser);
        newUser.id = result.insertId;
        return done(null);
      } catch (error) {
        req.flash("message", "el usuario existe");
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const rows = await pool.query("SELECT * FROM usuarios WHERE id = ?", [id]);
  done(null, rows[0]);
});
