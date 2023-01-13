const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const logger = require("morgan");
const cors = require("cors");
const passport = require("passport");
const multer = require("multer");

/**
IMPORTAR RUTAS
 * 
 */
const usersRoutes = require("./routes/userRoutes");
const categoriesRoutes = require("./routes/categoryRoutes");
const productsRoutes = require("./routes/productsRoutes");





const { secretOrKey } = require("./config/keys");
var session = require("express-session");

require("./config/passport")(passport);

const port = process.env.PORt || 3000;
app.set("port", port);

app.use(logger("dev"));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());
app.use(
  session({
    secret: secretOrKey,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
  })
);
app.use(passport.initialize());
app.use(passport.session());

require("./config/passport")(passport);

app.use(cors());

app.disable("x-powered-by");
app.set("port", port);

const upload = multer({
  storage: multer.memoryStorage(),
});

/**
 * LLAMADO DE RUTAS
 */

usersRoutes(app, upload);
categoriesRoutes(app);
productsRoutes(app,upload);

server.listen(3000, "" || "localhost", function () {
  console.log("Aplicacion de NodeJS " + port + " Iniciada");
});

//Manejo de error.

app.use((err, req, res, next) => {
  console.log(err);
  res.status(err.status || 500).send(err.stack);
});

// 200 - Respuesta Exitosa
// 404 - No existe Url
// 500 - Error interno del servidor
