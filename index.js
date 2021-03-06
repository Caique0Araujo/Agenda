const express = require("express");
const exphbs = require("express-handlebars");
const session = require("express-session");
const FileStore = require("session-file-store")(session);
const flash = require("express-flash");
const checkAuth = require("./services/AuthenticateService").checkAuth;

const contactRoutes = require("./routes/contactRoutes");
const groupRoutes = require("./routes/groupRoutes");
const eventRoutes = require("./routes/eventRoutes");
const userRoutes = require("./routes/userRoutes");
const eventContactsRoutes = require("./routes/eventContactRoutes");
const groupContactsRoutes = require("./routes/groupContactRoutes");

const conn = require("./db/conn");

const Contact = require("./models/Contact");

const app = express();

app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");

app.use(express.static("public"));

app.use(flash());

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());

app.use(
  session({
    name: "session",
    secret: "our_secret",
    resave: false,
    saveUninitialized: false,
    store: new FileStore({
      logFn: function () {},
      path: require("path").join(require("os").tmpdir(), "sessions"),
    }),
    cookie: {
      secure: false,
      maxAge: 3600000,
      httpOnly: true,
    },
  })
);

app.use((req, res, next) => {
  if (req.session.userid) {
    res.locals.session = req.session;
  }
  next();
});

app.use("/contacts", contactRoutes);
app.use("/groups", groupRoutes);
app.use("/events", eventRoutes);
app.use("/users", userRoutes);
app.use("/events_contacts", eventContactsRoutes);
app.use("/groups_contacts", groupContactsRoutes);

app.get("/", checkAuth, async (req, res) => {
  const userid = req.session.userid;

  try {
    const contacts = await Contact.findAll({
      raw: true,
      where: { UserId: userid },
    });

    res.render("home", { contacts: contacts });
  } catch (error) {
    console.log(error);
  }
});

conn
  .sync()
  .then(() => {
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
