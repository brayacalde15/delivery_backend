
const usersController = require("../controllers/usersController");

/** Require multer */
const multer = require('multer');

module.exports = (app, upload) => {
  //GET -> OBTENER DATOS
  // POST -> ALMACENAR DATOS
  //DELETE -> BORRAR DATOS
  //PUT -> ACTUALIZAR DATOS

  app.post("/api/users/create",usersController.register); 
  app.post("/api/users/createWithImage", multer().array("image", 1), usersController.registerWithImage);
  app.post("/api/users/login", usersController.login);
  
};
