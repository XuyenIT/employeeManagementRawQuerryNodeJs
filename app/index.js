const express = require("express");
const path = require("path");
const session = require("express-session");
const rootRouter = require("./router/root.router");
const app = express();

const port = 3000;

//set view engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//session
// goi use session truoc use router
app.use(
  session({
    resave: true,
    saveUninitialized: true,
    secret: "somesecret",
    cookie: { maxAge: 60000 },
  })
);
app.use((req, res, next) => {
  res.locals.message = req.session.message;
  delete req.session.message;
  next();
});

app.use(rootRouter);

//set static file
const publictPathDirectory = path.join(__dirname, "public");
console.log(publictPathDirectory);
app.use(express.static(publictPathDirectory));

app.listen(port, () => {
  console.log(`Listening express on http://localhost:${port}`);
});
